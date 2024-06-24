import errors from "../errors";
const { ContentError, MatchError } = errors;

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/;
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/;

const registerUser = (
  name,
  surname,
  email,
  username,
  password,
  repeatedPassword,
  callback,
) => {
  // check if all fields are full
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

  if (!NAME_REGEX.test(name)) {
    throw new ContentError("Name is not valid");
  }

  if (!NAME_REGEX.test(surname)) {
    throw new ContentError("Surname is not valid");
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new ContentError("Email is not valid");
  }

  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("Username is not valid");
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("Password is not valid");
  }

  if (password.length < 8) {
    throw new ContentError("Password should be at least 8 characters long");
  }

  if (password !== repeatedPassword) {
    throw new MatchError("Passwords do not match");
  }

  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function");
  }

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

  xhr.onerror = () => {
    callback(new SystemError("Network error: Unable to reach the server."));
  };

  xhr.open("POST", "http://localhost:8080/users");

  const body = { name, surname, email, username, password, repeatedPassword };

  const json = JSON.stringify(body);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(json);
};

export default registerUser;
