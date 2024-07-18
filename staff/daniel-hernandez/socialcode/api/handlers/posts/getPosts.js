import logic from "../../logic/index.js";
import jwt from "../../util/jsonwebtoken-promisified.js";
const { JWT_SECRET } = process.env;

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

export default getPosts;
