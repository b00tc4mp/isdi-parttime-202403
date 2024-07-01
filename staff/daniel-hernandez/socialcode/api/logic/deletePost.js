import data from "../data/index.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";
import { ObjectId } from "mongodb";

const deletePost = (username, id) => {
  validate.username(username);
  validate.id(id, "Post ID");

  return (async () => {
    let user, post;

    try {
      user = await data.users.findOne({ username });
    } catch {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      post = await data.posts.findOne({ _id: new ObjectId(id) });
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
      await data.posts.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }
  })();

  /* return data.users
    .findOne({ username })
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      return data.posts.findOne({ _id: new ObjectId(id) });
    })
    .then((post) => {
      if (!post) {
        throw new MatchError("post not found");
      }

      if (post.author !== username) {
        throw new MatchError("post author does not match user");
      }

      return data.posts.deleteOne({ _id: new ObjectId(id) });
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
