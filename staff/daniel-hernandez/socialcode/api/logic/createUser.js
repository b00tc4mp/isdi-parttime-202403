import data from "../data/data.js";
import { SystemError, DuplicityError, ContentError } from "com/errors.js";
import validate from "com/validate.js";
import bcrypt from "bcryptjs";

const createUser = (
  name,
  surname,
  email,
  username,
  password,
  repeatedPassword,
) => {
  if (
    !name ||
    !surname ||
    !email ||
    !username ||
    !password ||
    !repeatedPassword
  ) {
    throw new ContentError("All fields are required");
  }

  validate.name(name);
  validate.name(surname, "Surname");
  validate.email(email);
  validate.username(username);
  validate.password(password);
  validate.matchingPasswords(password, repeatedPassword);

  return (async () => {
    let existingUser, hash;

    try {
      existingUser = await data.findUser((user) => user.username === username);
    } catch (error) {
      throw new SystemError(`failed to create user: ${error.message}`);
    }

    if (existingUser) {
      throw new DuplicityError("Username already exists");
    }

    try {
      hash = await bcrypt.hash(password, 8);
    } catch (error) {
      throw new SystemError(error.message);
    }

    const userData = {
      name,
      surname,
      email,
      username,
      password: hash,
    };

    try {
      await data.createUser(userData);
    } catch (error) {
      throw new SystemError(`failed to create user: ${error.message}`);
    }
  })();

  /* return data
    .findUser((user) => user.username === username)
    .then((existingUser) => {
      if (existingUser) {
        throw new DuplicityError("username already exists");
      }

      const userData = {
        name,
        surname,
        email,
        username,
        password,
      };

      return data.createUser(userData);
    })
    .catch((error) => {
      if (error instanceof DuplicityError) {
        throw error;
      } else {
        throw new SystemError(`failed to create user: ${error.message}`);
      }
    }); */
};

export default createUser;
