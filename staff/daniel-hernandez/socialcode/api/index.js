import express from "express";
import fs from "fs/promises";

const api = express();

api.use(express.json());

api.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("./data/posts.json", "utf-8");
    const posts = JSON.parse(data);
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
});

api.get("/users", async (req, res) => {
  try {
    const data = await fs.readFile("./data/users.json", "utf-8");
    const users = JSON.parse(data);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

api.listen(8080, (req, res) => {
  console.log("server up");
});
