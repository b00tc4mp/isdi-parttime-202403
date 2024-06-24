import data from "../data/data.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";

const authenticateUser = (username, password) => {
  validate.username(username);
  validate.password(password);

  return (async () => {
    let user;

    try {
      user = await data.findUser((user) => user.username === username);
    } catch (error) {
      throw new SystemError(`failed to authenticate user: ${error.message}`);
    }

    if (!user) {
      throw new MatchError("user not found");
    }

    if (user.password !== password) {
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
