import "dotenv/config";
import { MongoClient } from "mongodb";
import data from "../data/index.js";
import logic from "./index.js";

const { MONGO_URI } = process.env;

const testGetPosts = async () => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db("test");
    const users = db.collection("users");
    const postsC = db.collection("posts");

    data.users = users;
    data.posts = postsC;

    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    const posts = await logic.getPosts("tester");
    console.log(posts);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log("database connection closed");
  }
};

testGetPosts();
