import "dotenv/config";
import mongoose from "mongoose";
import authenticateUser from "./authenticateUser.js";

const { MONGO_URI } = process.env;

const testAuthenticateUser = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    await authenticateUser("MrGreen", "123123123");
    console.log("user authenticated");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("database connection closed");
  }
};

testAuthenticateUser();
