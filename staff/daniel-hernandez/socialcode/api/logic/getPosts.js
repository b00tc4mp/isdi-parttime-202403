import { User, Post } from "../data/index.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";

const getPosts = (username) => {
  validate.username(username);

  return (async () => {
    let user, posts;

    try {
      user = await User.findOne({ username }).lean();
    } catch (error) {
      throw new SystemError(`failed to get posts: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      posts = await Post.find({})
        .select("-__v -createdAt -updatedAt")
        .sort({ date: -1 })
        .lean();
    } catch (error) {
      throw new SystemError(`failed to get posts: ${error.message}`);
    }

    posts.forEach((post) => {
      post.id = post._id.toString();

      delete post._id;
    });

    return posts;
  })();

  /* return User
    .findOne({ username })
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      return Post.find({}).select("-__v -createdAt -updatedAt").sort({ date: -1 }).lean();
    })
    .then((posts) => {
      posts.forEach((post) => {
        post.id = post._id.toString();

        delete post._id;
      });

      return posts;
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
