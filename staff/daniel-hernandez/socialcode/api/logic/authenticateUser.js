import data from "../data/data.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";
import bcrypt from "bcryptjs";

const authenticateUser = (username, password) => {
  validate.username(username);
  validate.password(password);

  return (async () => {
    let user, match;

    try {
      user = await data.findUser((user) => user.username === username);
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

  /* return data
    .findUser((user) => user.username === username)
    .catch((error) => {
      throw new SystemError(`failed to authenticate user: ${error.message}`);
    })
    .then((user) => {
      if (!user) {
        throw new MatchError("user not found");
      }

      if (user.password !== password) {
        throw new MatchError("wrong password");
      }
    }); */
};

export default authenticateUser;
