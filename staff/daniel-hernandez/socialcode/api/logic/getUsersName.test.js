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
    const usersName = await getUsersName("tester", "tester2");
    console.log(usersName);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("database connection closed");
  }
};

testGetUsersName();
