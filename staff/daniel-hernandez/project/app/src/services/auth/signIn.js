import Config from 'react-native-config';
import validate from 'com/validation';
import errors, { FetchError, ParseError } from 'com/errors';

const signIn = (email, password) => {
   validate.inputs(email, password);
   validate.email(email);
   validate.password(password);

   return (async () => {
      let res, body, tokenObj;

      try {
         res = await fetch(`${Config.API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
         });
      } catch (error) {
         throw new FetchError(`Fetch failed: ${error.message}`);
      }

      if (res.status === 200) {
         try {
            tokenObj = await res.json();
         } catch {
            throw new ParseError(`Token parse failed: ${error.message}`);
         }

         return tokenObj.token;
      }

      try {
         body = await res.json();
      } catch (error) {
         throw new ParseError(`Error parse failed: ${error.message}`);
      }

      const { error, message } = body;
      const constructor = errors[error];

      throw new constructor(message);
   })();
};

export default signIn;
