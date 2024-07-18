import express from "express";
const router = express.Router();
import {
  getPosts,
  createPost,
  deletePost,
  likePost,
} from "../handlers/index.js";

router.route("/").get(getPosts).post(createPost);
router.route("/:postId").delete(deletePost);
router.route("/:postId/likes").patch(likePost);

export default router;
