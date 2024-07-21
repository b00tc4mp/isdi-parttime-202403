import "dotenv/config";
import mongoose from "mongoose";
import createUser from "../../../../logic/users/createUser.js";

const { MONGO_TEST_URI } = process.env;

const testCreateUser = async () => {
  try {
    await mongoose.connect(MONGO_TEST_URI);
    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    await createUser(
      "testerName",
      "testerSurname",
      "test@email.com",
      "tester",
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
