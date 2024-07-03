import { User, Post } from "../data/index.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";
import { Types } from "mongoose";
const { ObjectId } = Types;

const deletePost = (username, id) => {
  validate.username(username);
  validate.id(id, "Post ID");

  return (async () => {
    let user, post;

    try {
      user = await User.findOne({ username }).lean();
    } catch {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      post = await Post.findById(id).lean();
    } catch (error) {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }

    if (!post) {
      throw new MatchError("post not found");
    }

    if (post.author !== username) {
      throw new MatchError("post author does not match user");
    }

    try {
      await Post.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }
  })();

  /* return User
    .findOne({ username })
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      return Post.findById(id).lean();
    })
    .then((post) => {
      if (!post) {
        throw new MatchError("post not found");
      }

      if (post.author !== username) {
        throw new MatchError("post author does not match user");
      }

      return Post.deleteOne({ _id: new ObjectId(id) });
    })
    .catch((error) => {
      if (error instanceof MatchError) {
        throw error;
      } else {
        throw new SystemError(`failed to delete post: ${error.message}`);
      }
    }); */
};

export default deletePost;
