import {
  ContentError,
  MatchError,
  DuplicityError,
  SystemError,
  CredentialError,
  NotFoundError,
} from "com/errors.js";

import jsonwebtoken from "../util/jsonwebtoken-promisified.js";
const { JsonWebTokenError, TokenExpiredError } = jsonwebtoken;

const errorHandler = (err, _, res, __) => {
  if (err instanceof TokenExpiredError) {
    err = new CredentialError(err.message);
  }

  if (err instanceof JsonWebTokenError) {
    err = new SystemError(err.message);
  }

  const errorMap = {
    [ContentError.name]: {
      name: ContentError.name,
      status: 400,
      defaultMessage: "Content error",
    },
    [MatchError.name]: {
      name: MatchError.name,
      status: 412,
      defaultMessage: "Match error",
    },
    [DuplicityError.name]: {
      name: DuplicityError.name,
      status: 409,
      defaultMessage: "Duplicity error",
    },
    [SystemError.name]: {
      name: SystemError.name,
      status: 500,
      defaultMessage: "System error",
    },
    [CredentialError.name]: {
      name: CredentialError.name,
      status: 401,
      defaultMessage: "Credential error",
    },
    [NotFoundError.name]: {
      name: NotFoundError.name,
      status: 404,
      defaultMessage: "Not found error",
    },
  };

  const errorResponse = errorMap[err.constructor.name];

  if (errorResponse) {
    return res.status(errorResponse.status).json({
      error: errorResponse.name,
      message: err.message || errorResponse.defaultMessage,
    });
  } else {
    return res.status(500).json({
      error: SystemError.name,
      message: err.message || "An unexpected error occurred.",
    });
  }
};

export default errorHandler;
