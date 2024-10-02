import { Track, User } from '../data/index.js';
import { CredentialError, InvalidArgumentError, NotFoundError, SystemError } from 'com/errors.js';
import { access, stat } from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from './log.js';

const { TRACK_DIR } = process.env;

const stream = (userId, trackId, range) => {
   validate.inputs(userId, trackId);
   validate.objectId(userId);
   validate.objectId(trackId);

   if (range) {
      validate.inputs(range);
      validate.range(range);
   }

   return (async () => {
      let track, user, stats, start, end;

      try {
         user = await User.findById(userId).lean();
      } catch (error) {
         throw new SystemError(`Streaming the track failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError("User doesn't exist");
      }

      try {
         track = await Track.findById(trackId).lean();
      } catch (error) {
         throw new SystemError(`Streaming the track failed: ${error.message}`);
      }

      if (!track) {
         throw new NotFoundError('Track not found');
      }

      // Track directory joined with the track id
      const trackPath = path.join(TRACK_DIR, trackId);

      try {
         await access(trackPath);
      } catch {
         throw new NotFoundError('Track file not found');
      }

      try {
         stats = await stat(trackPath);
      } catch (error) {
         throw new SystemError(`Streaming the track failed: ${error.message}`);
      }

      const fileSize = stats.size;

      if (range) {
         const parts = range.replace(/bytes=/, '').split('-');
         if (parts[0]) {
            start = parseInt(parts[0], 10);
            end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
         } else {
            start = Math.max(0, fileSize - parseInt(parts[1], 10));
            end = fileSize - 1;
         }
         if (start < 0 || start >= fileSize || end >= fileSize || start > end) {
            throw new InvalidArgumentError('Range exceeds file size');
         }
      } else {
         start = 0;
         end = fileSize - 1;
      }

      const stream = createReadStream(trackPath, { start, end });
      const streamInfo = {
         contentRange: `bytes ${start}-${end}/${fileSize}`,
         contentLength: end - start + 1,
         contentType: 'audio/mpeg',
         stream
      };

      try {
         await log(userId, constants.PLAYED_TRACK, trackId, constants.types[1]);
      } catch (error) {
         throw new SystemError(`Streaming the track failed: ${error.message}`);
      }

      return streamInfo;
   })();
};

export default stream;
