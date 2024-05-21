import express from "express";
const api = express();

//middleware
api.use(express.json());

//routes
import { datarouter } from "./routes/data.js";

api.use("/", datarouter);

api.listen(8080, (req, res) => console.log("server up"));
