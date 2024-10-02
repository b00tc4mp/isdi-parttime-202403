import jwt from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError } = jwt;

function sign(payload, secret, options) {
   return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (error, token) => {
         if (error) {
            reject(error);
            return;
         }

         resolve(token);
      });
   });
}

function verify(token, secret, options) {
   return new Promise((resolve, reject) => {
      jwt.verify(token, secret, options, (error, payload) => {
         if (error) {
            reject(error);
            return;
         }

         resolve(payload);
      });
   });
}

export default {
   sign,
   verify,

   JsonWebTokenError,
   TokenExpiredError
};
