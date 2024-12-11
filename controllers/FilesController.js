import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import fs from 'fs';
import Bull from 'bull';
import { v4 as uuidv4 } from 'uuid';

const fileQueue = new Bull('fileQueue');

class FilesController {
  static async postUpload(req, res) {
    const token = req.header('X-Token');
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { name, type, parentId, isPublic = false, data } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing name' });
    if (!type || !['folder', 'file', 'image'].includes(type)) return res.status(400).json({ error: 'Missing type' });
    if (!data && type !== 'folder') return res.status(400).json({ error: 'Missing data' });

    const user = await dbClient.findUser({ _id: userId });
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const parent = parentId ? await dbClient.findFile({ _id: parentId, userId }) : null;
    if (parentId && (!parent || parent.type !== 'folder')) {
      return res.status(400).json({ error: 'Parent not found' });
    }

    const fileId = uuidv4();
    const filePath = `/tmp/files_manager/${fileId}`;

    if (type !== 'folder') {
      fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
    }

    const file = await dbClient.addFile({
      userId,
      name,
      type,
      isPublic,
      parentId: parentId || 0,
      localPath: type !== 'folder' ? filePath : null,
    });

    if (type === 'image') {
      await fileQueue.add({ userId, fileId });
    }

    return res.status(201).json({
      id: file.insertedId,
      userId,
      name,
      type,
      isPublic,
      parentId: parentId || 0,
    });
  }
}

export default FilesController;
