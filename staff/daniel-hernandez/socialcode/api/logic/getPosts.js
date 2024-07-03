import data from "../data/index.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";

const getPosts = (username) => {
  validate.username(username);

  return (async () => {
    let user, posts;

    try {
      user = data.users.findOne({ username });
    } catch (error) {
      throw new SystemError(`failed to get posts: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      posts = await data.posts.find({}).sort({ date: -1 }).toArray();
    } catch (error) {
      throw new SystemError(`failed to get posts: ${error.message}`);
    }

    posts.forEach((post) => {
      post.id = post._id.toString();

      delete post._id;
    });

    return posts;
  })();

  /* return data.users
    .findOne({ username })
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      return data.posts.find({}).toArray();
    })
    .then((posts) => {
      posts.forEach((post) => {
        post.id = post._id.toString();

        delete post._id;
      });

      return posts.reverse();
    })
    .catch((error) => {
      if (error instanceof MatchError) {
        throw error;
      } else {
        throw new SystemError(`failed to get posts: ${error.message}`);
      }
    }); */
};

export default getPosts;
