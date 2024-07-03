import data from "../data/index.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";

const createPost = (username, title, image, description) => {
  validate.username(username);
  validate.text(title, "Title", 50);
  validate.url(image, "Image");
  validate.text(description, "Description", 200);

  return (async () => {
    let user;

    try {
      user = await data.users.findOne({ username });
    } catch (error) {
      throw new SystemError(`failed to create post: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    const post = {
      author: username,
      title,
      image,
      description,
      date: new Date(),
      likes: [],
    };

    try {
      await data.posts.insertOne(post);
    } catch (error) {
      throw new SystemError(`failed to create post: ${error.message}`);
    }
  })();

  /* return data.users
    .findOne({ username })
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      const post = {
        author: username,
        title,
        image,
        description,
        data: new Date(),
      };

      return data.posts.insertOne(post);
    })
    .catch((error) => {
      if (error instanceof MatchError) {
        throw error;
      } else {
        throw new SystemError(`failed to create post: ${error.message}`);
      }
    }); */
};

export default createPost;
