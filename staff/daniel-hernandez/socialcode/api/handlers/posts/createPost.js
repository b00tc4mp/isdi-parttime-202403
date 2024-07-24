import logic from '../../logic/index.js';
import jwt from '../../utils/jsonwebtoken-promisified.js';
const { JWT_SECRET } = process.env;

const createPost = async (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ')[1];
      const { sub: userId } = await jwt.verify(token, JWT_SECRET, {});
      const { title, image, description } = req.body;

      await logic.createPost(userId, title, image, description);

      res.status(201).send();
   } catch (error) {
      next(error);
   }
};

export default createPost;
