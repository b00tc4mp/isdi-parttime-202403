import errors from "./errors.js";
const { ContentError, MatchError, TypeError, SystemError } = errors;

const logic = {};

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/;
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/;
const ID_REGEX = /^[a-z0-9]+[a-z0-9]{5}$/;

logic.registerUser = (
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

  // name regex
  if (!NAME_REGEX.test(name)) {
    throw new ContentError("Name is not valid");
  }

  // surname regex
  if (!NAME_REGEX.test(surname)) {
    throw new ContentError("Surname is not valid");
  }

  // email regex
  if (!EMAIL_REGEX.test(email)) {
    throw new ContentError("Email is not valid");
  }

  // username regex
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("Username is not valid");
  }

  // password regex
  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("Password is not valid");
  }

  // check password length
  if (password.length < 8) {
    throw new ContentError("Password should be at least 8 characters long");
  }

  // check if passwords match
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

    const { error, errormsg } = JSON.parse(xhr.response);

    const constructor = errors[error];

    callback(new constructor(errormsg));
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

logic.loginUser = (username, password, callback) => {
  // username regex
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError();
  }

  // password regex
  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError();
  }

  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function");
  }

  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      sessionStorage.username = username;
      callback(null);
      return;
    }

    const { error, errormsg } = JSON.parse(xhr.response);

    const constructor = errors[error];

    callback(new constructor(errormsg));
  };

  xhr.onerror = () => {
    callback(new SystemError("Network error: Unable to reach the server."));
    console.error("Network error: Unable to reach the server.");
  };

  xhr.open("POST", "http://localhost:8080/users/auth");

  const body = { username, password };
  const json = JSON.stringify(body);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(json);
};

logic.isUserLoggedIn = () => {
  return !!sessionStorage.username;
};

logic.logoutUser = () => {
  delete sessionStorage.username;
};

logic.getUsername = () => {
  return sessionStorage.getItem("username");
};

logic.getUsersName = (callback) => {
  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function");
  }

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const name = JSON.parse(xhr.response);

      callback(null, name);
      return;
    }

    const { error, errormsg } = JSON.parse(xhr.response);

    const constructor = errors[error];

    callback(new constructor(errormsg));
  };

  xhr.onerror = () => {
    callback(new SystemError("Network error: Unable to reach the server."));
  };

  xhr.open("GET", `http://localhost:8080/users/${sessionStorage.username}`);

  xhr.setRequestHeader("Authorization", `Basic ${sessionStorage.username}`);
  xhr.send();
};

logic.getAllPosts = (callback) => {
  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function");
  }

  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      const posts = JSON.parse(xhr.response);
      callback(null, posts);
      return;
    }
    const { error, errormsg } = JSON.parse(xhr.response);

    const constructor = errors[error];
    callback(new constructor(errormsg));
  };

  xhr.onerror = () => {
    callback(new SystemError("Network error: Unable to reach the server."));
  };

  xhr.open("GET", "http://localhost:8080/posts");
  xhr.send();
};

logic.createPost = (title, image, description, callback) => {
  if (typeof title !== "string" || !title.length || title.length > 50) {
    throw new ContentError("Title is not valid.");
  }
  if (typeof image !== "string" || !image.startsWith("http")) {
    throw new ContentError("Image is not valid.");
  }
  if (
    typeof description !== "string" ||
    !description.length ||
    description.length > 200
  ) {
    throw new ContentError("Description is not valid.");
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

    const { error, errormsg } = JSON.parse(xhr.response);
    const constructor = errors[error];

    callback(new constructor(errormsg));
  };

  xhr.onerror = () => {
    callback(new SystemError("Network error: Unable to reach the server."));
  };

  xhr.open("POST", "http://localhost:8080/posts");
  xhr.setRequestHeader("Authorization", `Basic ${sessionStorage.username}`);

  const body = {
    title,
    image,
    description,
  };

  const json = JSON.stringify(body);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(json);
};

logic.deletePost = (id, callback) => {
  if (!ID_REGEX.test(id)) {
    throw new ContentError("post ID is not valid");
  }
  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function");
  }

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 204) {
      callback(null);

      return;
    }

    const { error, errormsg } = JSON.parse(xhr.response);

    const constructor = errors[error];

    callback(new constructor(errormsg));
  };

  xhr.onerror = () => {
    callback(new SystemError("Network error: Unable to reach the server."));
  };

  xhr.open("DELETE", `http://localhost:8080/posts/${id}`);

  xhr.setRequestHeader("Authorization", `Basic ${sessionStorage.username}`);
  xhr.send();
};

export default logic;
