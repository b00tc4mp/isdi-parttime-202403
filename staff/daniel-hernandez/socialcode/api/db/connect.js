import mongoose from "mongoose";
import { SystemError } from "com/errors.js";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      /*options*/
    });

    console.log("mongoose connected...");
  } catch (error) {
    throw new SystemError(`mongoose connection failed: ${error}`);
  }
};

export default connectDB;
