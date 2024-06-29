import { SystemError } from "com/errors.js";
import { MongoClient } from "mongodb";

const connectDB = async (url) => {
  try {
    const client = await MongoClient.connect(url, {
      /*options*/
    });

    console.log("MongoDB connected...");
    return client;
  } catch (error) {
    throw new SystemError(`mongoDB connection failed: ${error}`);
  }
};

export default connectDB;
