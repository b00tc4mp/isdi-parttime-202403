import express from "express";
// import cors from "cors";
// TODO configure cors
const api = express();

//middleware
api.use(express.json());

// routes
import { datarouter } from "./routes/data.js";

api.use("/", datarouter);

api.listen(8080, () => console.log("server up"));
