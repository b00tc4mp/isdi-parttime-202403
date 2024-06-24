import data from "../data/data.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";

const getPosts = (username) => {
  validate.username(username);

  return (async () => {
    let user, posts;

    try {
      user = data.findUser((user) => user.username === username);
    } catch (error) {
      throw new SystemError(`failed to get posts: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      posts = await data.getPosts();
    } catch (error) {
      throw new SystemError(`failed fetching posts: ${error.message}`);
    }

    return posts.reverse();
  })();

  /* return data
    .findUser((user) => user.username === username)
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      return data.getPosts();
    })
    .then((posts) => {
      return posts.reverse();
    })
    .catch((error) => {
      if (error instanceof MatchError) {
        throw error;
      } else {
        throw new SystemError(`failed fetching posts: ${error.message}`);
      }
    }); */
};

export default getPosts;
