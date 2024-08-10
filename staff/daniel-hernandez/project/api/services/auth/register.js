import { User } from '../../data/index.js';
import { DuplicateEntryError, SystemError } from 'com/errors.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from '../log.js';
import bcrypt from 'bcryptjs';

const register = (email, password, username) => {
   validate.inputs(email, password, username);
   validate.email(email);
   validate.password(password);
   validate.username(username);

   return (async () => {
      let existingUser, passwordHash;

      try {
         existingUser = await User.findOne({
            $or: [{ email }, { username }]
         }).lean();
      } catch (error) {
         throw new SystemError(`Register failed: ${error.message}`);
      }

      if (existingUser) {
         throw new DuplicateEntryError('User already exists');
      }

      try {
         passwordHash = await bcrypt.hash(password, 8);
      } catch (error) {
         throw new SystemError(`Register failed: ${error.message}`);
      }

      try {
         const user = await User.create({ email, passwordHash, username });
         await log(user.id, constants.REGISTERED);
      } catch (error) {
         throw new SystemError(`Register failed: ${error.message}`);
      }
   })();
};

export default register;
