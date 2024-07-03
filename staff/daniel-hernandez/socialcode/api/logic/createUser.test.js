import "dotenv/config";
import mongoose from "mongoose";
import createUser from "./createUser.js";

const { MONGO_URI } = process.env;

const testCreateUser = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    await createUser(
      "Mr",
      "Purple",
      "mr@purple.com",
      "MrPurple",
      "123123123",
      "123123123",
    );
    console.log("user created");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("database connection closed");
  }
};

testCreateUser();
