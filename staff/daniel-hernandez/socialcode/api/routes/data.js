import express from "express";
const router = express.Router();
import {
  getPosts,
  createUser,
  createPost,
  getUser,
  deletePost,
  authUser,
  likePost,
} from "../controllers/data.js";

router.route("/posts").get(getPosts).post(createPost);
router.route("/posts/:postId").delete(deletePost);
router.route("/posts/:postId/likes").patch(likePost);

router.route("/users").post(createUser);
router.route("/users/auth").post(authUser);
router.route("/users/:targetUserId").get(getUser);

export { router as datarouter };
