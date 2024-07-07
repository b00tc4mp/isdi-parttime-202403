import { User, Post } from "../data/index.js";
import validate from "com/validate.js";
import { SystemError, MatchError } from "com/errors.js";

const likePost = (userId, postId) => {
  validate.id(userId, "User ID");
  validate.id(postId, "Post ID");

  return (async () => {
    let user, post;

    try {
      user = await User.findById(userId).lean();
    } catch (error) {
      throw new SystemError(`failed to like post: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      post = await Post.findById(postId);
    } catch (error) {
      throw new SystemError(`failed to like post: ${error.message}`);
    }

    if (!post) {
      throw new MatchError("post not found");
    }

    const index = post.likes.indexOf(userId);

    if (index < 0) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    try {
      await post.save();
    } catch (error) {
      throw new SystemError(`failed to like post: ${error.message}`);
    }
  })();
};

export default likePost;
