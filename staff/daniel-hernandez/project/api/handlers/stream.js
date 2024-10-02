import services from '../services/index.js';
import jwt from '../utils/jsonwebtoken-promisified.js';
import validate from 'com/validation.js';
import { CredentialError } from 'com/errors.js';

const { URL_SECRET } = process.env;

const stream = async (req, res, next) => {
   const { id: userId } = req.user;
   const { track: trackId } = req.params;
   const { token } = req.query;
   const { range } = req.headers;

   try {
      if (!token || !req.query.token) {
         throw new CredentialError('Token missing or malformed url');
      }

      validate.token(token);

      const { sub: { userId: uId, trackId: tId } } = await jwt.verify(token, URL_SECRET);

      if (uId !== userId || tId !== trackId) {
         throw new CredentialError('Invalid token for this user or track')
      }

      const { stream, contentType, contentLength, contentRange } = await services.stream(userId, trackId, range);

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Length', contentLength);
      res.setHeader('Content-Range', contentRange);
      res.setHeader('Accept-Ranges', 'bytes');
      res.status(range ? 206 : 200);

      stream.pipe(res);
   } catch (error) {
      next(error);
   }
};

export default stream;
