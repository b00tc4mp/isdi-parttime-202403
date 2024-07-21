import "dotenv/config";
import mongoose from "mongoose";
import deletePost from "../../../../logic/posts/deletePost.js";

const { MONGO_TEST_URI } = process.env;

const testDeletePost = async () => {
  try {
    await mongoose.connect(MONGO_TEST_URI);
    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    await deletePost("6699fd4dda678b7dd6eead6f", "6699fe8b8b3a588d1fe3badb");
    console.log("post deleted");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("database connection closed");
  }
};

testDeletePost();
