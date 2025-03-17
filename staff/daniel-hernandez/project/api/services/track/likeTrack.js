import { User, Track } from '../../data/index.js';
import { CredentialError, InvalidArgumentError, NotFoundError, SystemError } from 'com/errors.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from '../log.js';

// TODO: utilize / implement mongodb transactions to avoid inconsistent log status
const likeTrack = (userId, targetTrackId) => {
   validate.inputs(userId, targetTrackId);
   validate.objectId(userId);
   validate.objectId(targetTrackId);

   return (async () => {
      let user, track, hasLiked;

      try {
         user = await User.findById(userId).lean();
      } catch (error) {
         throw new SystemError(`Liking the track failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError('User does not exist');
      }

      try {
         track = await Track.findById(targetTrackId).populate('addedBy');
      } catch (error) {
         throw new SystemError(`Failed to like track: ${error.message}`);
      }

      if (!track) {
         throw new NotFoundError('Target track does not exist');
      }

      if (!track.addedBy) {
         throw new NotFoundError('User who added the track not found');
      }

      if (track.addedBy._id.equals(user._id)) {
         throw new InvalidArgumentError('You cannot like your own track');
      }

      try {
         hasLiked = await User.exists({
            _id: userId,
            likedTracks: targetTrackId
         });
      } catch (error) {
         throw new SystemError(`Failed to check if user has liked track: ${error.message}`);
      }

      try {
         await User.updateOne({ _id: userId }, hasLiked ? { $pull: { likedTracks: targetTrackId } } : { $push: { likedTracks: targetTrackId } });
      } catch (error) {
         throw new SystemError(`Failed to like track: ${error.message}`);
      }

      try {
         await log(userId, hasLiked ? constants.DISLIKED_TRACK : constants.LIKED_TRACK, targetTrackId, constants.types.TRACK);
      } catch (error) {
         throw new SystemError(`Failed to like track: ${error.message}`);
      }
   })();
};

export default likeTrack;
