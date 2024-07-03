import "dotenv/config";
import mongoose from "mongoose";
import likePost from "./likePost.js";

const { MONGO_URI } = process.env;

const testLikePost = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    await likePost("tester2", "668580c514cd0c74444073fe");
    console.log("post liked");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("database connection closed");
  }
};

testLikePost();
