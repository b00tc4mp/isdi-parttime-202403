import errors, { SystemError, ContentError } from "com/errors";
import validate from "com/validate";

const registerUser = (
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
    let res, body;

    try {
      res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
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
      });
    } catch {
      throw new SystemError("Server error");
    }

    if (res.status === 201) return;

    try {
      body = await res.json();
    } catch {
      throw new SystemError("Server error");
    }

    const { error, message } = body;
    const constructor = errors[error];

    throw new constructor(message);
  })();
};

export default registerUser;
