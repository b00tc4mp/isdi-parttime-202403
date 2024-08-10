import validate from 'com/validation';
import constants from 'com/constants';
import errors, { FetchError, ParseError } from 'com/errors';
import extractPayload from '../../utils/extractPayload';

const signOut = token => {
   validate.inputs(token);
   validate.token(token);
   const { sub: userId } = extractPayload(token);

   return (async () => {
      let res, body;

      try {
         res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/logs`, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, type: constants.LOGGED_OUT })
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

export default signOut;
