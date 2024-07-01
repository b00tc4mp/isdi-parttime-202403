import "dotenv/config";
import { MongoClient } from "mongodb";
import data from "../data/index.js";
import logic from "./index.js";

const { MONGO_URI } = process.env;

const testCreatePost = async () => {
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
    await logic.createPost(
      "tester",
      "this is a test post title",
      "https://imgs.search.brave.com/DHxbw6MrtUk2o-cyqdu0gDJwWPgHm2WH4yJzTSfCDvs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcmdlLXByZXZp/ZXdzLzllOS90ZXN0/LTEtMTQ4NjQ1OC5q/cGc_Zm10",
      "this is a test post description",
    );
    console.log("post created");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log("database connection closed");
  }
};

testCreatePost();
