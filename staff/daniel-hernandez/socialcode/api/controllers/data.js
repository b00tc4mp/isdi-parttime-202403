import logic from "../logic/logic.js";

const getPosts = async (req, res) => {
  try {
    const posts = await logic.getPosts();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await logic.getUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    await logic.createPost(req.body);
    res.status(200).json({ success: true, msg: "created post" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    await logic.createUser(req.body);
    res.status(200).json({ success: true, msg: "created user" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await logic.getUser(req.params.username);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await logic.getPost(req.params.id);
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.constructor.name,
      errormsg: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const postID = req.params.id;
    await logic.deletePost(postID);
    res
      .status(200)
      .json({ success: true, msg: `deleted post with id: ${postID} ` });
  } catch (error) {
    res.status(500).json({
      success: false,
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
};
