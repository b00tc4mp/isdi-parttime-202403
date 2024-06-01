import logic from "../logic/logic.js";
// TODO async wrapper

const getPosts = async (req, res) => {
  try {
    const posts = await logic.getPosts();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await logic.getUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const username = req.headers.authorization.split(" ")[1];

    const { title, image, description } = req.body;

    await logic.createPost(username, title, image, description);
    res.status(201).send();
  } catch (error) {
    res.status(500).json({
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, surname, email, username, password, repeatedPassword } =
      req.body;

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
      errormsg: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const username = req.headers.authorization.split(" ")[1];
    const { targetUsername } = req.params;

    const name = await logic.getUsersName(username, targetUsername);
    res.status(200).json({ name });
  } catch (error) {
    res.status(500).json({
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await logic.getPost(req.params.id);
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const username = req.headers.authorization.split(" ")[1];
    const { postID } = req.params;

    await logic.deletePost(username, postID);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const authUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    await logic.authenticateUser(username, password);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({
      error: error.constructor.name,
      errormsg: error.message,
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
