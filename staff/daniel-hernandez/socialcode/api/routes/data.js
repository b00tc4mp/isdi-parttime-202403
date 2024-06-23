import express from "express";
const router = express.Router();
import {
  getPosts,
  createUser,
  createPost,
  getUser,
  deletePost,
  authUser,
} from "../controllers/data.js";

router.route("/posts").get(getPosts).post(createPost);
router.route("/posts/:postID").delete(deletePost);

router.route("/users").post(createUser);
router.route("/users/auth").post(authUser);
router.route("/users/:targetUsername").get(getUser);

export { router as datarouter };
