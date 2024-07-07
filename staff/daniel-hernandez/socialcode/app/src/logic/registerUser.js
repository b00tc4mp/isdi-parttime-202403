import errors, { SystemError } from "com/errors";
import validate from "com/validate";
const { ContentError } = errors;

const registerUser = (
  name,
  surname,
  email,
  username,
  password,
  repeatedPassword,
  callback,
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
  validate.callback(callback);

  fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      surname,
      email,
      username,
      password,
      repeatedPassword,
    }),
  })
    .then((res) => {
      if (res.status === 201) {
        callback(null);
        return;
      }

      return res
        .json()
        .then((body) => {
          const { error, message } = body;
          const constructor = errors[error];

          callback(new constructor(message));
        })
        .catch((error) => callback(new SystemError(error.message)));
    })
    .catch((error) => callback(new SystemError(error.message)));
};

export default registerUser;
