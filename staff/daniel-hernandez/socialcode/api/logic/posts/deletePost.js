import { User, Post } from "../../data/index.js";
import { SystemError, MatchError, NotFoundError } from "com/errors.js";
import validate from "com/validate.js";
import { Types } from "mongoose";
const { ObjectId } = Types;

const deletePost = (userId, id) => {
  validate.id(userId, "User ID");
  validate.id(id, "Post ID");

  return (async () => {
    let user, post;

    try {
      user = await User.findById(userId).lean();
    } catch {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }

    if (!user) {
      throw new NotFoundError("user not found");
    }

    try {
      post = await Post.findById(id).lean();
    } catch (error) {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }

    if (!post) {
      throw new NotFoundError("post not found");
    }

    if (post.author.toString() !== userId) {
      throw new MatchError("post author does not match user");
    }

    try {
      await Post.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }
  })();
};

export default deletePost;
