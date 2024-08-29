import logic from '../../logic/index.js';
import jwt from '../../utils/jsonwebtoken-promisified.js';
const { JWT_SECRET } = process.env;

const authUser = async (req, res, next) => {
   const { username, password } = req.body;

   try {
      const userId = await logic.authenticateUser(username, password);
      const token = await jwt.sign({ sub: userId }, JWT_SECRET, {
         expiresIn: '30d'
      });

      res.status(200).json({ token });
   } catch (error) {
      next(error);
   }
};

export default authUser;
