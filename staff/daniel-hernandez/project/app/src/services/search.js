import Config from 'react-native-config';
import * as SecureStore from 'expo-secure-store';
import validate from 'com/validation';
import constants from 'com/constants';
import errors, { FetchError, ParseError, RetrievalError } from 'com/errors';

const search = (query, types = [], limit = constants.DEFAULT_LIMIT, page = 1) => {
   validate.inputs(query, types, limit, page);
   validate.query(query);
   validate.queryTypes(types);
   validate.limit(limit);
   validate.page(page);

   return (async () => {
      let userToken, res, body, queryObj;

      try {
         userToken = await SecureStore.getItemAsync('userToken');
      } catch (error) {
         throw new RetrievalError(`Token retrieval failed: ${error.message}`);
      }

      if (!userToken) throw new RetrievalError('No token found');

      try {
         res = await fetch(`${Config.API_URL}/api/v1/search?${new URLSearchParams({ q: query, types: types.join(','), limit: limit.toString(), page: page.toString() }).toString()}`, {
            headers: { Authorization: `Bearer ${userToken}` }
         });
      } catch (error) {
         throw new FetchError(`Fetch failed: ${error.message}`);
      }

      if (res.status === 200) {
         try {
            queryObj = await res.json();
         } catch (error) {
            throw new ParseError(`Query object parse failed: ${error.message}`);
         }

         return queryObj;
      }

      try {
         body = await res.json();
      } catch (error) {
         throw new ParseError(`Error parse failed ${error.message}`);
      }

      const { error, message } = body;
      const constructor = errors[error];

      throw new constructor(message);
   })();
};

export default search;
