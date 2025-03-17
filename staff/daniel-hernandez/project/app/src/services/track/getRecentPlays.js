import Config from 'react-native-config';
import * as SecureStore from 'expo-secure-store';
import errors, { FetchError, ParseError, RetrievalError } from 'com/errors';

const getRecentPlays = () => {
   return (async () => {
      let userToken, res, body, recentPlays;

      try {
         userToken = await SecureStore.getItemAsync(Config.USER_TOKEN_KEY);
      } catch (error) {
         throw new RetrievalError(`Token retrieval failed: ${error.message}`);
      }

      if (!userToken) throw new RetrievalError('No token found');

      try {
         res = await fetch(`${Config.API_URL}/api/v1/track/recent`, {
            headers: { Authorization: `Bearer ${userToken}` }
         });
      } catch (error) {
         throw new FetchError(`Fetch failed: ${error.message}`);
      }

      if (res.status === 200) {
         try {
            recentPlays = await res.json();
         } catch (error) {
            throw new ParseError(`Recent play parse failed: ${error.message}`);
         }

         return recentPlays;
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

export default getRecentPlays;
