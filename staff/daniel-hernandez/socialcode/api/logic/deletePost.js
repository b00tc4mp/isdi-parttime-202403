import data from "../data/data.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";

const deletePost = (username, id) => {
  validate.username(username);
  validate.id(id, "Post ID");

  return (async () => {
    let user, post;

    try {
      user = await data.findUser((user) => user.username === username);
    } catch {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      post = await data.findPost((post) => post.id === id);
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
      await data.deletePost((post) => post.id === id);
    } catch (error) {
      throw new SystemError(`failed to delete post: ${error.message}`);
    }
  })();

  /* return data
    .findUser((user) => user.username === username)
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      return data.findPost((post) => post.id === id);
    })
    .then((post) => {
      if (!post) {
        throw new MatchError("post not found");
      }

      if (post.author !== username) {
        throw new MatchError("post author does not match user");
      }
      
      return data.deletePost((post) => post.id === id);
    })
    .catch((error) => {
      if (error instanceof MatchError || error instanceof ContentError) {
        throw error;
      } else {
        throw new SystemError(`failed to delete post: ${error.message}`);
      }
    }); */
};

export default deletePost;
