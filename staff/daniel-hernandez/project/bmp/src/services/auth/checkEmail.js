import validate from 'com/validation';
import errors, { FetchError, ParseError } from 'com/errors';

const checkEmail = email => {
   validate.inputs(email);
   validate.email(email);

   return (async () => {
      let res, body, boolObj;

      try {
         res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/check-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
         });
      } catch (error) {
         throw new FetchError(`Fetch failed: ${error.message}`);
      }

      if (res.status === 200) {
         try {
            boolObj = await res.json();
         } catch (error) {
            throw new ParseError(`Token parse failed: ${error.message}`);
         }

         return boolObj.bool;
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

export default checkEmail;
