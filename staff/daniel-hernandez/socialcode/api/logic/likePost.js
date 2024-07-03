import { User, Post } from "../data/index.js";
import validate from "com/validate.js";
import { SystemError, MatchError } from "com/errors.js";

const likePost = (username, id) => {
  validate.username(username);
  validate.id(id, "Post ID");

  return (async () => {
    let user, post;

    try {
      user = await User.findOne({ username }).lean();
    } catch (error) {
      throw new SystemError(`failed to like post: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      post = await Post.findById(id);
    } catch (error) {
      throw new SystemError(`failed to like post: ${error.message}`);
    }

    if (!post) {
      throw new MatchError("post not found");
    }

    const index = post.likes.indexOf(username);

    if (index < 0) {
      post.likes.push(username);
    } else {
      post.likes.splice(index, 1);
    }

    try {
      await post.save();
    } catch (error) {
      throw new SystemError(`failed to like post: ${error.message}`);
    }
  })();

  /* return User.findOne({ username })
    .lean()
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      return Post.findById(id)
    })
    .then((post) => {
      if (!post) {
        throw new MatchError("post not found");
      }

      const index = post.likes.indexOf(username);

      if (index < 0) {
        post.likes.push(username);
      } else {
        post.likes.splice(index, 1);
      }

      return post.save();
    })
    .catch(error) {
    if (error instanceof MatchError) {
      throw error
    } else {
      throw new SystemError(`failed to like post: ${error.message}`)
    }
  } */
};

export default likePost;
