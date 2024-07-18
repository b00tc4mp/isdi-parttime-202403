import { User } from "../../data/index.js";
import { SystemError, CredentialError } from "com/errors.js";
import validate from "com/validate.js";
import bcrypt from "bcryptjs";

const authenticateUser = (username, password) => {
  validate.username(username);
  validate.password(password);

  return (async () => {
    let user, match;

    try {
      user = await User.findOne({ username }).lean();
    } catch (error) {
      throw new SystemError(`failed to authenticate user: ${error.message}`);
    }

    if (!user) {
      throw new CredentialError("user not found");
    }

    try {
      match = await bcrypt.compare(password, user.password);
    } catch (error) {
      throw new SystemError(error.message);
    }

    if (!match) {
      throw new CredentialError("wrong password");
    }

    return user._id.toString();
  })();
};

export default authenticateUser;
