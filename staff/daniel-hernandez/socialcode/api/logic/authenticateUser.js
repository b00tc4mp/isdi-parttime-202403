import data from "../data/index.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";
import bcrypt from "bcryptjs";

const authenticateUser = (username, password) => {
  validate.username(username);
  validate.password(password);

  return (async () => {
    let user, match;

    try {
      user = await data.users.findOne({ username });
    } catch (error) {
      throw new SystemError(`failed to authenticate user: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    try {
      match = await bcrypt.compare(password, user.password);
    } catch (error) {
      throw new SystemError(error.message);
    }

    if (!match) {
      throw new MatchError("wrong password");
    }
  })();

  /* return data.users
    .findOne({ username })
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      return bcrypt.compare(password, user.password);
    })
    .then((match) => {
      if (!match) {
        throw new MatchError("wrong password");
      }
    })
    .catch((error) => {
      if (error instanceof MatchError) {
        throw error;
      }

      throw new SystemError(`failed to authenticate user: ${error.message}`);
    }); */
};

export default authenticateUser;
