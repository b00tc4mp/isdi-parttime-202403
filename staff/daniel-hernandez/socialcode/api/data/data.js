import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { SystemError } from "../errors/errors.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = {};

data.findUser = async (condition) => {
  try {
    const filePath = path.resolve(__dirname, "./users.json");
    let json = await fs.readFile(filePath, "utf-8");
    if (!json) json = "[]";

    const users = JSON.parse(json);
    const user = users.find(condition);
    return user;
  } catch (error) {
    throw new SystemError(error.message);
  }
};

data.createUser = async (user) => {
  try {
    const filePath = path.resolve(__dirname, "./users.json");
    let json = await fs.readFile(filePath, "utf-8");
    if (!json) json = "[]";

    const users = JSON.parse(json);
    users.push(user);
    const newjson = JSON.stringify(users);

    await fs.writeFile(filePath, newjson);
  } catch (error) {
    throw new SystemError(error.message);
  }
};

// TODO create a FILTER posts
data.findPost = async (condition) => {
  try {
    const filePath = path.resolve(__dirname, "./posts.json");
    let json = await fs.readFile(filePath, "utf-8");
    if (!json) json = "[]";

    const posts = JSON.parse(json);
    const post = posts.find(condition);
    return post;
  } catch (error) {
    throw new SystemError(error.message);
  }
};

data.createPost = async (post) => {
  try {
    const filePath = path.resolve(__dirname, "./posts.json");
    let json = await fs.readFile(filePath, "utf-8");
    if (!json) json = "[]";

    const posts = JSON.parse(json);
    posts.push(post);
    const newjson = JSON.stringify(posts);

    await fs.writeFile(filePath, newjson);
  } catch (error) {
    throw new SystemError(error.message);
  }
};

data.deletePost = async (condition) => {
  try {
    const filePath = path.resolve(__dirname, "./posts.json");
    const json = await fs.readFile(filePath, "utf-8");

    let posts = JSON.parse(json);
    const postIndex = posts.findIndex(condition);

    if (postIndex > -1) {
      posts.splice(postIndex, 1);

      const newjson = JSON.stringify(posts);
      await fs.writeFile(filePath, newjson);
    } else {
      throw new SystemError("post not found");
    }
  } catch (error) {
    throw new SystemError(error.message);
  }
};

data.getPosts = async () => {
  try {
    const filePath = path.resolve(__dirname, "./posts.json");
    let json = await fs.readFile(filePath, "utf-8");
    if (!json) json = "[]";

    const posts = JSON.parse(json);
    return posts;
  } catch (error) {
    throw new SystemError(error.message);
  }
};

data.getUsers = async () => {
  try {
    const filePath = path.resolve(__dirname, "./users.json");
    let json = await fs.readFile(filePath, "utf-8");
    if (!json) json = "[]";

    const users = JSON.parse(json);
    return users;
  } catch (error) {
    throw new SystemError(error.message);
  }
};

export default data;
