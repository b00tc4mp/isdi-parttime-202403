import logic from "../logic/index.js";
import jwt from "../util/jsonwebtoken-promisified.js";
const { JWT_SECRET } = process.env;
// TODO: async wrapper

const getPosts = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { sub: userId } = await jwt.verify(token, JWT_SECRET, {});

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit) || 10;

    const start = (page - 1) * limit;
    const end = page * limit;

    const allPosts = await logic.getPosts(userId);
    const posts = allPosts.slice(start, end);

    res.status(200).json({ page, limit, posts, total: allPosts.length });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { sub: userId } = await jwt.verify(token, JWT_SECRET, {});
    const { title, image, description } = req.body;

    await logic.createPost(userId, title, image, description);

    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
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
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { sub: userId } = await jwt.verify(token, JWT_SECRET, {});
    const { targetUserId } = req.params;

    const name = await logic.getUsersName(userId, targetUserId);

    res.status(200).json({ name });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { sub: userId } = await jwt.verify(token, JWT_SECRET, {});
    const { postId } = req.params;

    await logic.deletePost(userId, postId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const authUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const userId = await logic.authenticateUser(username, password);
    const token = await jwt.sign({ sub: userId }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { sub: userId } = await jwt.verify(token, JWT_SECRET, {});
    const { postId } = req.params;

    await logic.likePost(userId, postId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export {
  getPosts,
  createUser,
  createPost,
  getUser,
  deletePost,
  authUser,
  likePost,
};
