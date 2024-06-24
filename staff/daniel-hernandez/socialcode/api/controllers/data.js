import logic from "../logic/index.js";
import jwt from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;
import { SystemError } from "com/errors.js";
// TODO: async wrapper

const getPosts = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { sub: username } = jwt.verify(token, "super secret");

    const posts = await logic.getPosts(username);
    res.status(200).json({ posts });
  } catch (error) {
    if (
      error instanceof JsonWebTokenError ||
      error instanceof TokenExpiredError
    ) {
      res.status(500).json({
        error: SystemError.name,
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: error.constructor.name,
        message: error.message,
      });
    }
  }
};

// NOTE: unused
const getUsers = async (req, res) => {
  try {
    const users = await logic.getUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({
      error: error.constructor.name,
      message: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { sub: username } = jwt.verify(token, "super secret");
    const { title, image, description } = req.body;

    await logic.createPost(username, title, image, description);
    res.status(201).send();
  } catch (error) {
    if (
      error instanceof JsonWebTokenError ||
      error instanceof TokenExpiredError
    ) {
      res.status(500).json({
        error: SystemError.name,
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: error.constructor.name,
        message: error.message,
      });
    }
  }
};

const createUser = async (req, res) => {
  const { name, surname, email, username, password, repeatedPassword } =
    req.body;

  try {
    await logic.createUser(
      name,
      surname,
      email,
      username,
      password,
      repeatedPassword,
    );
    res.status(201).send();
  } catch (error) {
    res.status(500).json({
      error: error.constructor.name,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { sub: username } = jwt.verify(token, "super secret");
    const { targetUsername } = req.params;

    const name = await logic.getUsersName(username, targetUsername);

    res.status(200).json({ name });
  } catch (error) {
    if (
      error instanceof JsonWebTokenError ||
      error instanceof TokenExpiredError
    ) {
      res.status(500).json({
        error: SystemError.name,
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: error.constructor.name,
        message: error.message,
      });
    }
  }
};

// NOTE: unused
const getPost = async (req, res) => {
  try {
    const post = await logic.getPost(req.params.id);
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({
      error: error.constructor.name,
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { sub: username } = jwt.verify(token, "super secret");
    const { postID } = req.params;

    await logic.deletePost(username, postID);
    res.status(204).send();
  } catch (error) {
    if (
      error instanceof JsonWebTokenError ||
      error instanceof TokenExpiredError
    ) {
      res.status(500).json({ error: SystemError.name, message: error.message });
    } else {
      res.status(500).json({
        error: error.constructor.name,
        message: error.message,
      });
    }
  }
};

const authUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    await logic.authenticateUser(username, password);
    const token = jwt.sign({ sub: username }, "super secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({
      error: error.constructor.name,
      message: error.message,
    });
  }
};

export {
  getPosts,
  getUsers,
  createUser,
  createPost,
  getUser,
  getPost,
  deletePost,
  authUser,
};
