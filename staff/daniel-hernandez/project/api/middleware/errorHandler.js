import { ConnectionError, InvalidArgumentError, SystemError, DuplicateEntryError, CredentialError, InvalidTokenError, TokenExpiredError, FetchError, ParseError, NotFoundError } from 'com/errors.js';
import jsonwebtoken from '../utils/jsonwebtoken-promisified.js';
const { JsonWebTokenError, TokenExpiredError: JWTTokenExpiredError } = jsonwebtoken;

const errorHandler = (err, _, res, __) => {
   if (err instanceof JWTTokenExpiredError) {
      err = new TokenExpiredError(err.message);
   }

   if (err instanceof JsonWebTokenError) {
      err = new InvalidTokenError(err.message);
   }

   const errorMap = {
      [ConnectionError.name]: {
         name: ConnectionError.name,
         status: 503,
         defaultMessage: 'Connection error'
      },
      [InvalidArgumentError.name]: {
         name: InvalidArgumentError.name,
         status: 400,
         defaultMessage: 'Invalid argument error'
      },
      [SystemError.name]: {
         name: SystemError.name,
         status: 500,
         defaultMessage: 'System error'
      },
      [DuplicateEntryError.name]: {
         name: DuplicateEntryError.name,
         status: 409,
         defaultMessage: 'Duplicate entry error'
      },
      [CredentialError.name]: {
         name: CredentialError.name,
         status: 401,
         defaultMessage: 'Credential error'
      },
      [InvalidTokenError.name]: {
         name: InvalidTokenError.name,
         status: 401,
         defaultMessage: 'Invalid token'
      },
      [TokenExpiredError.name]: {
         name: TokenExpiredError.name,
         status: 401,
         defaultMessage: 'Token has expired'
      },
      [FetchError.name]: {
         name: FetchError.name,
         status: 500,
         defaultMessage: 'Fetch error'
      },
      [ParseError.name]: {
         name: ParseError.name,
         status: 500,
         defaultMessage: 'Parse error'
      },
      [NotFoundError.name]: {
         name: NotFoundError.name,
         status: 404,
         defaultMessage: 'Not found error'
      }
   };

   const errorResponse = errorMap[err.constructor.name];

   if (errorResponse) {
      return res.status(errorResponse.status).json({
         error: errorResponse.name,
         message: err.message || errorResponse.defaultMessage
      });
   } else {
      return res.status(500).json({
         error: SystemError.name,
         message: err.message || 'An unexpected error occurred'
      });
   }
};

export default errorHandler;
