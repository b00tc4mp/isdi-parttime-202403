import "dotenv/config";
import { MongoClient } from "mongodb";
import data from "../data/data.js";
import logic from "./index.js";

const { MONGO_URI } = process.env;

const testAuthenticateUser = async () => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db("test");
    const users = db.collection("users");
    data.users = users;

    console.log("connected to database");
  } catch (error) {
    console.error(`failed to connect to db: ${error}`);
  }

  try {
    await logic.authenticateUser("MrGreen", "123123123");
    console.log("user authenticated");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log("database connection closed");
  }
};

testAuthenticateUser();
