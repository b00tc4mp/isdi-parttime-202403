import Config from 'react-native-config';
import * as SecureStore from 'expo-secure-store';
import validate from 'com/validation';
import errors, { FetchError, ParseError, RetrievalError } from 'com/errors';

const getUserInfo = targetUserId => {
   validate.inputs(targetUserId);
   validate.objectId(targetUserId);

   return (async () => {
      let userToken, res, body, userInfo;

      try {
         userToken = await SecureStore.getItemAsync(Config.USER_TOKEN_KEY);
      } catch (error) {
         throw new RetrievalError(`Token retrieval failed: ${error.message}`);
      }

      if (!userToken) throw new RetrievalError('No token found');

      try {
         res = await fetch(`${Config.API_URL}/api/v1/user/profile/${targetUserId}`, {
            headers: { Authorization: `Bearer ${userToken}` }
         });
      } catch (error) {
         throw new FetchError(`Fetch failed: ${error.message}`);
      }

      if (res.status === 200) {
         try {
            userInfo = await res.json();
         } catch (error) {
            throw new ParseError(`User info parse failed: ${error.message}`);
         }

         return userInfo;
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

export default getUserInfo;
