import data from "../data/index.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";

const getUsersName = (username, targetUsername) => {
  validate.username(username);
  validate.username(targetUsername, "Target username");

  return (async () => {
    let user, targetUser;

    try {
      user = await data.users.findOne({ username });
    } catch (error) {
      throw new SystemError(`failed to get user's name: ${error.message}`);
    }

    if (!user) throw new MatchError("user not found");

    try {
      targetUser = await data.users.findOne({ username: targetUsername });
    } catch (error) {
      throw new SystemError(`failed to get user's name: ${error.message}`);
    }

    if (!targetUser) throw new MatchError("target user was not found");

    return targetUser.name;
  })();

  /* return data.users
    .findOne({ username })
    .then((user) => {
      if (!user) throw new MatchError("user not found");

      return data.users.findOne({ username: targetUsername });
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
