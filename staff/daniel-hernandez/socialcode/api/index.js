import express from "express";
// import cors from "cors";
// TODO configure cors
const api = express();

//middleware
// TODO error handler middleware (works in tandem with custom error and async wrapper)
api.use([express.static("public"), express.json()]);

// routes
import { datarouter } from "./routes/data.js";
import notFound from "./middleware/not-found.js";

api.use("/", datarouter);
api.use(notFound);
// api.use(errorHandler)

api.listen(8080, () => console.log("server up"));
