import "dotenv/config";
import mongoose from "mongoose";
import getUsersName from "./getUsersName.js";

const { MONGO_URI } = process.env;

const testGetUsersName = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    const usersName = await getUsersName(
      "6689d7a2c1cc123de17f7b63",
      "66877d12b1faa9184be8cf9c",
    );
    console.log(usersName);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("database connection closed");
  }
};

testGetUsersName();
