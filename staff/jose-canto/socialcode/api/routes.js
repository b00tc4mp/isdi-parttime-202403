// routes.js
import express from 'express';
import routes from './handlers/index.js';

const jsonBodyParser = express.json({ strict: true, type: "application/json" })

const router = express.Router();

router.post("/users", jsonBodyParser, routes.registerUserHandler);
router.post("/users/auth", jsonBodyParser, routes.authenticaterUserHandler);
router.get("/users/:targetUserId", routes.getUserNameHandler);
router.post("/posts", jsonBodyParser, routes.createPostHandler);
router.get("/posts", routes.getAllPostsHandler);
router.delete("/posts/:postId", routes.deletePostHandler);
router.patch("/posts/like/:postId", routes.toggleLikePostHandler);
router.patch("/posts/:postId/comments", jsonBodyParser, routes.createPostCommentHandler);
router.get("/posts/:postId/comments", routes.getPostCommentsHandler);
router.patch("/posts/:postId/edit", jsonBodyParser, routes.editPostTitleHandler);

export default router;
