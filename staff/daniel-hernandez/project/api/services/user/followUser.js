import { User } from '../../data/index.js';
import { CredentialError, InvalidArgumentError, NotFoundError, SystemError } from 'com/errors.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from '../log.js';

const followUser = (userId, targetUserId) => {
   validate.inputs(userId, targetUserId);
   validate.objectId(userId);
   validate.objectId(targetUserId);

   return (async () => {
      let user, targetUser;

      try {
         user = await User.findById(userId).select('_id').lean();
      } catch (error) {
         throw new SystemError(`Follow failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError("User doesn't exist");
      }

      try {
         targetUser = await User.findById(targetUserId).select('followers').lean();
      } catch (error) {
         throw new SystemError(`Follow failed: ${error.message}`);
      }

      if (!targetUser) {
         throw new NotFoundError("Target user doesn't exist");
      }

      if (user._id.toString() === targetUser._id.toString()) {
         throw new InvalidArgumentError('You cannot follow yourself !');
      }

      const following = targetUser.followers.some(followerId => followerId.toString() === userId);

      try {
         await Promise.all([User.updateOne({ _id: userId }, following ? { $pull: { following: targetUserId } } : { $push: { following: targetUserId } }), User.updateOne({ _id: targetUserId }, following ? { $pull: { followers: userId } } : { $push: { followers: userId } })]);
      } catch (error) {
         throw new SystemError(`Failed to follow user: ${error.message}`);
      }

      try {
         await log(userId, following ? constants.UNFOLLOWED_USER : constants.FOLLOWED_USER, targetUserId, constants.types.TARGET_USER);
      } catch (error) {
         throw new SystemError(`Follow failed: ${error.message}`);
      }
   })();
};

export default followUser;
