import "dotenv/config";
import mongoose from "mongoose";
import likePost from "../../../../logic/posts/likePost.js";

const { MONGO_TEST_URI } = process.env;

const testLikePost = async () => {
  try {
    await mongoose.connect(MONGO_TEST_URI);
    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    await likePost("6699fdd5aa12d58224464b42", "6699fe8b8b3a588d1fe3badb");
    console.log("post liked");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("database connection closed");
  }
};

testLikePost();
