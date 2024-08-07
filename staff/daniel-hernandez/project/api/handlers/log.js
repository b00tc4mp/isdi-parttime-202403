import services from '../services/index.js';
import jwt from '../utils/jsonwebtoken-promisified.js';
import { CredentialError } from 'com/errors.js';
const { JWT_SECRET } = process.env;

const log = async (req, res, next) => {
   try {
      if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
         throw new CredentialError('Missing or malformed authorization header');
      }

      const token = req.headers.authorization.split(' ')[1];
      const { sub: tokenUserId } = await jwt.verify(token, JWT_SECRET);

      const { userId, type, targetId, targetType, query } = req.body;

      if (userId !== tokenUserId) {
         throw new CredentialError('User id in token does not match user id in request');
      }

      await services.log(userId, type, targetId, targetType, query);
      res.status(201).send();
   } catch (error) {
      next(error);
   }
};

export default log;
