import { Log, User } from '../data/index.js';
import { CredentialError, InvalidArgumentError, SystemError } from 'com/errors.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';

const log = (userId, type, targetId, targetType, query) => {
   validate.inputs(userId, type);
   validate.objectId(userId);
   validate.logType(type);

   if (type === constants.SEARCHED_TRACK) {
      if (!query) throw new InvalidArgumentError('No query provided');
      validate.inputs(query);
      validate.query(query);
   }

   if (targetId && targetType) {
      validate.inputs(targetId, targetType);
      validate.objectId(targetId);
      validate.targetType(targetType);
   } else if ((targetId && !targetType) || (targetType && !targetId)) {
      throw new InvalidArgumentError('No targetType or targetId');
   }

   return (async () => {
      let user, log;

      try {
         user = await User.findOne({ _id: userId }).lean();
      } catch (error) {
         throw new SystemError(`Log failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError("User doesn't exist");
      }

      const logData = { user: userId, type };
      if (targetId && targetType) {
         logData[targetType] = targetId;
      }
      if (type === constants.SEARCHED_TRACK && query) {
         logData.query = query;
      }

      try {
         log = new Log(logData);
         await log.save();
      } catch (error) {
         throw new SystemError(`Log creation failed: ${error.message}`);
      }
   })();
};

export default log;
