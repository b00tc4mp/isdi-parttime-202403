import express from "express";
const router = express.Router();
import {
  getPosts,
  getUsers,
  createUser,
  createPost,
  getUser,
  getPost,
  deletePost,
} from "../controllers/data.js";

router.route("/posts").get(getPosts).post(createPost);
router.route("/posts/:id").get(getPost).delete(deletePost);

router.route("/users").get(getUsers).post(createUser);
router.route("/users/:username").get(getUser);

export { router as datarouter };
