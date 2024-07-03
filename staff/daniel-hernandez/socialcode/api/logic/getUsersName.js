import { User } from "../data/index.js";
import { SystemError, MatchError } from "com/errors.js";
import validate from "com/validate.js";

const getUsersName = (username, targetUsername) => {
  validate.username(username);
  validate.username(targetUsername, "Target username");

  return (async () => {
    let user, targetUser;

    try {
      user = await User.findOne({ username }).lean();
    } catch (error) {
      throw new SystemError(`failed to get user's name: ${error.message}`);
    }

    if (!user) throw new MatchError("user not found");

    try {
      targetUser = await User.findOne({ username: targetUsername }).lean();
    } catch (error) {
      throw new SystemError(`failed to get user's name: ${error.message}`);
    }

    if (!targetUser) throw new MatchError("target user was not found");

    return targetUser.name;
  })();

  /* return User
    .findOne({ username })
    .then((user) => {
      if (!user) throw new MatchError("user not found");

      return User.findOne({ username: targetUsername });
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
