import { User } from "../data/index.js";
import { SystemError, NotFoundError } from "com/errors.js";
import validate from "com/validate.js";

const getUsersName = (userId, targetUserId) => {
  validate.id(userId, "User ID");
  validate.id(targetUserId, "TargetUser ID");

  return (async () => {
    let user, targetUser;

    try {
      user = await User.findById(userId).lean();
    } catch (error) {
      throw new SystemError(`failed to get user's name: ${error.message}`);
    }

    if (!user) {
      throw new NotFoundError("user not found");
    }

    try {
      targetUser = await User.findById(targetUserId).lean();
    } catch (error) {
      throw new SystemError(`failed to get user's name: ${error.message}`);
    }

    if (!targetUser) {
      throw new NotFoundError("target user was not found");
    }

    return targetUser.name;
  })();
};

export default getUsersName;
