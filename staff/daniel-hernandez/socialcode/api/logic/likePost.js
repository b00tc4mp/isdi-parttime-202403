import { User, Post } from "../data/index.js";
import validate from "com/validate.js";
import { SystemError, MatchError, NotFoundError } from "com/errors.js";

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
      throw new NotFoundError("user not found");
    }

    try {
      post = await Post.findById(postId);
    } catch (error) {
      throw new SystemError(`failed to like post: ${error.message}`);
    }

    if (!post) {
      throw new NotFoundError("post not found");
    }

    const includes = post.likes.some(
      (userObjectId) => userObjectId.toString() === userId,
    );

    try {
      await Post.updateOne(
        { _id: post._id },
        includes
          ? {
              $pull: {
                likes: user._id,
              },
            }
          : {
              $push: {
                likes: user._id,
              },
            },
      );
    } catch (error) {
      throw new SystemError(`failed to like post: ${error.message}`);
    }
  })();
};

export default likePost;
