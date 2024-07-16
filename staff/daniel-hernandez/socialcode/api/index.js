import "dotenv/config";
import express from "express";
import connectDB from "./db/connect.js";
import errorHandler from "./middleware/error-handler.js";
// TODO: configure cors
import cors from "cors";
const api = express();
const { PORT, MONGO_URI } = process.env;

//middleware
api.use([express.static("public"), express.json(), cors()]);

// TODO: fix routing ( separate further, fix naming aswell ~ controllers => handlers)
// routes
import { datarouter } from "./routes/data.js";
import notFound from "./middleware/not-found.js";

api.use("/", datarouter);
api.use(notFound);
api.use(errorHandler);

const start = async () => {
  try {
    await connectDB(MONGO_URI);

    api.listen(PORT, () => console.log(`server listening on port: ${PORT}...`));
  } catch (error) {
    console.error(error);
  }
};

start();
