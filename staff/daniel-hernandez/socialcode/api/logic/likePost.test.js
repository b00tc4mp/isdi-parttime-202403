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
    await likePost("6689d7a2c1cc123de17f7b63", "6689d6632178522b8434a930");
    console.log("post liked");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("database connection closed");
  }
};

testLikePost();
