import validate from 'com/validation';
import { TokenExpiredError, ParseError } from 'com/errors';

const extractPayload = token => {
   validate.inputs(token);
   validate.token(token);

   const [_, payload64] = token.split('.');
   const payloadJson = atob(payload64);

   let payload;
   try {
      payload = JSON.parse(payloadJson);
   } catch {
      throw new ParseError('Invalid token payload');
   }

   const secondsNow = Date.now() / 1000;
   if (typeof payload.exp != 'number' || secondsNow >= payload.exp) throw new TokenExpiredError('Token expired');

   return payload;
};

export default extractPayload;
