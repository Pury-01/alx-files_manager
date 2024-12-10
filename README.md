# **0x04. Files Manager**

This project is a summary of this back-end trimester: authentication, NodeJS, MongoDB, Redis, pagination, and background processing.

The objective is to build a simple platform to upload and view files:

- User authentication via a token
- List all files
- Upload a new file
- Change permission of a file
- View a file
- Generate thumbnails for images

You will be guided step by step for building it, but you have some freedoms of implementation, split in more files, etc. (utils folder will be your friend).

Of course, this kind of service already exists in real life - it’s a learning purpose to assemble each piece and build a full product.

**Enjoy!**

---

## **Resources**
Read or watch:

- [Node JS getting started](https://nodejs.org/en/docs/guides/getting-started-guide/)
- [Process API doc](https://nodejs.org/api/process.html)
- [Express getting started](https://expressjs.com/en/starter/installing.html)
- [Mocha documentation](https://mochajs.org/)
- [Nodemon documentation](https://nodemon.io/)
- [MongoDB](https://www.mongodb.com/)
- [Bull](https://optimalbits.github.io/bull/)
- [Image thumbnail](https://www.npmjs.com/package/image-thumbnail)
- [Mime-Types](https://www.npmjs.com/package/mime-types)
- [Redis](https://redis.io/)

---

## **Learning Objectives**
At the end of this project, you are expected to be able to explain to anyone, without the help of Google:

- How to create an API with Express
- How to authenticate a user
- How to store data in MongoDB
- How to store temporary data in Redis
- How to set up and use a background worker

---

## **Requirements**
- Allowed editors: `vi`, `vim`, `emacs`, `Visual Studio Code`
- All files will be interpreted/compiled on Ubuntu 18.04 LTS using Node (version 12.x.x)
- All files should end with a new line
- A `README.md` file, at the root of the folder of the project, is mandatory
- Code should use the `js` extension
- Code will be verified against lint using **ESLint**

---

## **Getting Started**
1. Clone the repository:
   ```bash
   git clone https://github.com/your_username/alx-files_manager.git
   cd alx-files_manager

