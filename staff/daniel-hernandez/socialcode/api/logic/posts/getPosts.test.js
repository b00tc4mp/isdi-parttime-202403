import "dotenv/config";
import mongoose from "mongoose";
import getPosts from "./getPosts.js";

const { MONGO_URI } = process.env;

const testGetPosts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    const posts = await getPosts("66877d12b1faa9184be8cf9c");
    console.log(posts);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("database connection closed");
  }
};

testGetPosts();
