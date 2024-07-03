import "dotenv/config";
import express from "express";
import connectDB from "./db/connect.js";
import cors from "cors";
// TODO: configure cors
const api = express();
const { PORT, MONGO_URI } = process.env;

//middleware
// TODO: error handler middleware (works in tandem with custom error and async wrapper)
api.use([express.static("public"), express.json(), cors()]);

// routes
import { datarouter } from "./routes/data.js";
import notFound from "./middleware/not-found.js";

api.use("/", datarouter);
api.use(notFound);
// api.use(errorHandler)

const start = async () => {
  try {
    await connectDB(MONGO_URI);

    api.listen(PORT, () => console.log(`server listening on port: ${PORT}...`));
  } catch (error) {
    console.error(error);
  }
};

start();
