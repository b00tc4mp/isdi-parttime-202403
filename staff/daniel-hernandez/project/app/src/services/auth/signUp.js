import validate from 'com/validation';
import errors, { FetchError, ParseError } from 'com/errors';

const signUp = (email, password, username) => {
   validate.inputs(email, password, username);
   validate.email(email);
   validate.password(password);
   validate.username(username);

   return (async () => {
      let res, body;

      try {
         res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username })
         });
      } catch (error) {
         throw new FetchError(`Fetch failed: ${error.message}`);
      }

      if (res.status === 201) return;

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

export default signUp;
