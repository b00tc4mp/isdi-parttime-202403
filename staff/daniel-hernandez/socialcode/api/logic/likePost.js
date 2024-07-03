import data from "../data/index.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";
import { ObjectId } from "mongodb";

const likePost = (username, id) => {
  validate.username(username);
  validate.id(id, "Post ID");

  return (async () => {
    let user, post;

    try {
      user = await data.users.findOne({ username });
    } catch (error) {
      throw new SystemError(`failed to like post: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      post = await data.posts.findOne({ _id: new ObjectId(id) });
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
      await data.posts.updateOne({ _id: new ObjectId(id) }, { $set: post });
    } catch (error) {
      throw new SystemError(`failed to like post: ${error.message}`);
    }
  })();
};

export default likePost;
