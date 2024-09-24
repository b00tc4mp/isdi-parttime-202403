import Config from 'react-native-config';
import * as SecureStore from 'expo-secure-store';
import validate from 'com/validation';
import errors, { FetchError, ParseError, RetrievalError } from 'com/errors';

const player = (id, { signal } = {}) => {
   validate.inputs(id);
   validate.objectId(id);

   return (async () => {
      let res, userToken, info;

      try {
         userToken = await SecureStore.getItemAsync(Config.USER_TOKEN_KEY);
      } catch (error) {
         throw new RetrievalError(`Token retrieval failed: ${error.message}`);
      }

      if (!userToken) throw new RetrievalError('No token found');

      try {
         res = await fetch(`${Config.API_URL}/api/v1/player`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${userToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ track: id }),
            ...(signal && { signal })
         });
      } catch (error) {
         if (signal?.aborted) throw new Error('AbortError');
         throw new FetchError(`Fetch failed: ${error.message}`);
      }

      if (res.status === 200) {
         try {
            info = await res.json();
         } catch (error) {
            throw new ParseError(`Failed to parse player info: ${error.message}`);
         }

         return { ...info, token: userToken };
      }

      try {
         body = await res.json();
      } catch (error) {
         throw new ParseError(`Error parse failed: ${error.message}`);
      }

      const { error, message } = body;
      constructor = errors[error];

      throw new constructor(message);
   })();
};

export default player;
