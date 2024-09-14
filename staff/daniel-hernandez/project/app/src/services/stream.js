import Config from 'react-native-config';
import RNFetchBlob from 'rn-fetch-blob';
import * as SecureStore from 'expo-secure-store';
import validate from 'com/validation';
import errors, { FetchError, ParseError, RetrievalError } from 'com/errors';

const stream = (id, range) => {
   validate.inputs(id);
   validate.objectId(id);

   if (range) {
      validate.inputs(range);
      validate.range(range);
   }

   return (async () => {
      let userToken, res, body, filePath;

      try {
         userToken = await SecureStore.getItemAsync('userToken');
      } catch (error) {
         throw new RetrievalError(`Token retrieval failed: ${error.message}`);
      }

      if (!userToken) throw new RetrievalError('No token found');

      try {
         res = await RNFetchBlob.config({
            fileCache: true,
            appendExt: '.mp3'
         }).fetch(
            'POST',
            `${Config.API_URL}/api/v1/tracks/${id}`,
            {
               Authorization: `Bearer ${userToken}`,
               Accept: 'application/json',
               'Content-Type': 'application/json'
            },
            JSON.stringify({ range })
         );
      } catch (error) {
         throw new FetchError(`Fetch failed: ${error.message}`);
      }

      const status = res.info().status;
      if (status === 200 || status === 206) {
         try {
            filePath = res.path();
         } catch (error) {
            throw new RetrievalError(`File path retrieval failed: ${error.message}`);
         }

         // Remember to remove tmp cache file at the file path after use
         return filePath;
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

export default stream;
