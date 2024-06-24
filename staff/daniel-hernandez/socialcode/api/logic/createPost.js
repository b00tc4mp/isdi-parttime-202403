import data from "../data/data.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";

const createPost = (username, title, image, description) => {
  function generateId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return timestamp + random;
  }

  validate.username(username);
  validate.text(title, "Title", 50);
  validate.url(image, "Image");
  validate.text(description, "Description", 200);

  return (async () => {
    let user;

    try {
      user = await data.findUser((user) => user.username === username);
    } catch (error) {
      throw new SystemError(`failed to create post: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    const post = {
      id: generateId(),
      author: username,
      title,
      image,
      description,
      date: new Date().toISOString(),
    };

    try {
      await data.createPost(post);
    } catch (error) {
      throw new SystemError(`failed to create post: ${error.message}`);
    }
  })();

  /* return data
    .findUser((user) => user.username === username)
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      const post = {
        id: generateId(),
        author: username,
        title,
        image,
        description,
        date: new Date().toISOString(),
      };

      return data.createPost(post);
    })
    .catch((error) => {
      if (error instanceof MatchError) {
        throw error;
      } else {
        throw new SystemError(`failed to create post ${error.message}`);
      }
    }); */
};

export default createPost;
