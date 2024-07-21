import "dotenv/config";
import mongoose from "mongoose";
import getUsersName from "../../../../logic/users/getUsersName.js";

const { MONGO_TEST_URI } = process.env;

const testGetUsersName = async () => {
  try {
    await mongoose.connect(MONGO_TEST_URI);
    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    const usersName = await getUsersName(
      "6699fd4dda678b7dd6eead6f",
      "6699fdd5aa12d58224464b42",
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
