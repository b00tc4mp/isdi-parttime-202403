import jwt from '../utils/jsonwebtoken-promisified.js';
import validate from 'com/validation.js';
import { CredentialError } from 'com/errors.js';
const { JWT_SECRET } = process.env;

const verifyToken = async (req, _, next) => {
   try {
      if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
         throw new CredentialError('Token missing or malformed authorization header');
      }

      const token = req.headers.authorization.split(' ')[1];
      if (!token) throw new CredentialError('Token missing in authorization header');
      validate.token(token);

      const { sub: id } = await jwt.verify(token, JWT_SECRET);

      req.user = { id };
      next();
   } catch (error) {
      next(error);
   }
};

export default verifyToken;
