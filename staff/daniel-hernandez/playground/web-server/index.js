const express = require("express");
const fsMiddleware = require("./fsMiddleware");

const server = express();

// server.use(express.static("./public"));

server.get("/*", fsMiddleware);

server.listen(8081, () => console.log("server up"));
