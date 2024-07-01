import "dotenv/config";
import { MongoClient } from "mongodb";
import data from "../data/index.js";
import logic from "./index.js";

const { MONGO_URI } = process.env;

const testDeletePost = async () => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db("test");
    const users = db.collection("users");
    const posts = db.collection("posts");

    data.users = users;
    data.posts = posts;

    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    await logic.deletePost("tester", "6681ff90e628bc5f2f16c64c");
    console.log("post deleted");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log("database connection closed");
  }
};

testDeletePost();
