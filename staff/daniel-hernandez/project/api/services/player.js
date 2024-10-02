import { User, Track } from '../data/index.js';
import { SystemError, CredentialError, NotFoundError } from 'com/errors.js';
import { access, stat } from 'fs/promises';
import path from 'path';
import jwt from '../utils/jsonwebtoken-promisified.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from './log.js';

const { TRACK_DIR, URL_SECRET, EXP_TIME, API_URL } = process.env;

const player = (userId, trackId) => {
   validate.inputs(userId, trackId);
   validate.objectId(userId);
   validate.objectId(trackId);

   return (async () => {
      let user, track, token, info;

      try {
         user = await User.findById(userId).lean();
      } catch (error) {
         throw new SystemError(`Fetching player information failed: ${error.message}`);
      }

      if (!user) throw new CredentialError("User doesn't exist");

      try {
         track = await Track.findById(trackId).lean();
      } catch (error) {
         throw new SystemError(`Fetching player information failed: ${error.message}`);
      }

      if (!track) throw new NotFoundError('Track not found');

      const trackPath = path.join(TRACK_DIR, trackId);

      try {
         await access(trackPath);
      } catch {
         throw new NotFoundError('Track file not found');
      }

      try {
         info = await stat(trackPath);
      } catch (error) {
         throw new SystemError(`Fetching player information failed: ${error.message}`);
      }

      try {
         token = await jwt.sign({ sub: { userId, trackId } }, URL_SECRET, { expiresIn: EXP_TIME });
      } catch (error) {
         throw new SystemError(`Failed to create url token: ${error.message}`);
      }

      try {
         await log(userId, constants.REQUESTED_TRACK, trackId, constants.types[1]);
      } catch (error) {
         throw new SystemError(`Fetching player information failed: ${error.message}`);
      }

      return { url: `${API_URL}/api/v1/stream/${trackId}?token=${token}`, mimeType: 'audio/mpeg', duration: track.duration, expiresIn: EXP_TIME };
   })();
};

export default player;
