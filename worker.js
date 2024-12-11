import Bull from 'bull';
import { promisify } from 'util';
import fs from 'fs';
import dbClient from './utils/db';
import imageThumbnail from 'image-thumbnail';

const fileQueue = new Bull('fileQueue');
const writeFileAsync = promisify(fs.writeFile);

fileQueue.process(async (job) => {
  const { fileId, userId } = job.data;

  if (!fileId) throw new Error('Missing fileId');
  if (!userId) throw new Error('Missing userId');

  const file = await dbClient.findFile({ _id: fileId, userId });
  if (!file || file.type !== 'image') throw new Error('File not found');

  try {
    const thumbnailSizes = [500, 250, 100];
    const originalFilePath = file.localPath;

    for (const size of thumbnailSizes) {
      const options = { width: size };
      const thumbnail = await imageThumbnail(originalFilePath, options);
      const thumbnailPath = `${originalFilePath}_${size}`;
      await writeFileAsync(thumbnailPath, thumbnail);
    }
  } catch (error) {
    console.error(`Error processing file ${fileId}: ${error.message}`);
  }
});
