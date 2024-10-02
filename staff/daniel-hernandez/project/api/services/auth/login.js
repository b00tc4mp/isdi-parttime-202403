import { User } from '../../data/index.js';
import { CredentialError, SystemError } from 'com/errors.js';
import validate from 'com/validation.js';
import constants from 'com/constants.js';
import log from '../log.js';
import bcrypt from 'bcryptjs';

const login = (email, password) => {
   validate.inputs(email, password);
   validate.email(email);
   validate.password(password);

   return (async () => {
      let user, match;

      try {
         user = await User.findOne({ email }).lean();
      } catch (error) {
         throw new SystemError(`Login failed: ${error.message}`);
      }

      if (!user) {
         throw new CredentialError("User doesn't exist");
      }

      try {
         match = await bcrypt.compare(password, user.passwordHash);
      } catch (error) {
         throw new SystemError(`Login failed: ${error.message}`);
      }

      if (!match) {
         throw new CredentialError('Wrong password');
      }

      try {
         await log(user._id.toString(), constants.LOGGED_IN);
      } catch (error) {
         throw new SystemError(`Login failed: ${error.message}`);
      }

      return user._id.toString();
   })();
};

export default login;
