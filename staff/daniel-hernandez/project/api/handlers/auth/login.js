import services from '../../services/index.js';
import jwt from '../../utils/jsonwebtoken-promisified.js';
const { JWT_SECRET } = process.env;

const login = async (req, res, next) => {
   const { email, password } = req.body;

   try {
      const userId = await services.login(email, password);
      const token = await jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '60d' });

      res.json({ token });
   } catch (error) {
      next(error);
   }
};

export default login;
