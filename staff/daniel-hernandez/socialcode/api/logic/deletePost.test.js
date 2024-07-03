import "dotenv/config";
import mongoose from "mongoose";
import deletePost from "./deletePost.js";

const { MONGO_URI } = process.env;

const testDeletePost = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    await deletePost("tester", "66857f3a1c1f08e7f5935f26");
    console.log("post deleted");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("database connection closed");
  }
};

testDeletePost();
