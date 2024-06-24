import data from "../data/data.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";

const getUsersName = (username, targetUsername) => {
  validate.username(username);
  validate.username(targetUsername, "Target username");

  return (async () => {
    let user, targetUser;

    try {
      user = await data.findUser((user) => user.username === username);
    } catch (error) {
      throw new SystemError(`failed to get user's name: ${error.message}`);
    }

    if (!user) throw new MatchError("user not found");

    try {
      targetUser = await data.findUser(
        (user) => user.username === targetUsername,
      );
    } catch (error) {
      throw new SystemError(`failed to get user's name: ${error.message}`);
    }

    if (!targetUser) throw new MatchError("target user was not found");

    return targetUser.name;
  })();

  /* return data
    .findUser((user) => user.username === username)
    .then((user) => {
      if (!user) throw new MatchError("user not found");

      return data.findUser((user) => user.username === targetUsername);
    })
    .then((targetUser) => {
      if (!targetUser) throw new MatchError("target user was not found");

      return targetUser.name;
    })
    .catch((error) => {
      if (error instanceof MatchError) {
        throw error;
      } else {
        throw new SystemError(`failed to get user's name: ${error.message}`);
      }
    }); */
};

export default getUsersName;
