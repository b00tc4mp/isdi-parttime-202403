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
  authUser,
} from "../controllers/data.js";

router.route("/posts").get(getPosts).post(createPost);

router.route("/users").post(createUser);
router.route("/users/auth").post(authUser);

export { router as datarouter };
