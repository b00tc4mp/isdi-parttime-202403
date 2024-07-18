import logic from "../../logic/index.js";
import jwt from "../../util/jsonwebtoken-promisified.js";
const { JWT_SECRET } = process.env;

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

export default getUser;
