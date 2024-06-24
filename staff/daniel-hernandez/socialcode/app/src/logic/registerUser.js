import errors from "com/errors";
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

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 201) {
      callback(null);
      return;
    }

    const { error, message } = JSON.parse(xhr.response);

    const constructor = errors[error];

    callback(new constructor(message));
  };

  xhr.open("POST", "http://localhost:8080/users");

  const body = { name, surname, email, username, password, repeatedPassword };

  const json = JSON.stringify(body);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(json);
};

export default registerUser;
