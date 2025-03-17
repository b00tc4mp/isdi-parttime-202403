import { User } from '../../data/index.js';
import { SystemError } from 'com/errors.js';
import validate from 'com/validation.js';

const checkEmail = email => {
   validate.inputs(email);
   validate.email(email);

   return (async () => {
      let user;

      try {
         user = await User.findOne({ email }).lean();
      } catch (error) {
         throw new SystemError(`Email check failed: ${error.message}`);
      }

      return !!user;
   })();
};

export default checkEmail;
