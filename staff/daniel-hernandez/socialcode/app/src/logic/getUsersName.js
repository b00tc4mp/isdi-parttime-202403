import errors from "../errors";
import extractPayload from "../utils/extractPayload";

// NOTE: unused
const getUsersName = (callback) => {
  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function");
  }

  const { sub: username } = extractPayload(sessionStorage.token);

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const name = JSON.parse(xhr.response);
      callback(null, name);

      return;
    }

    const { error, message } = JSON.parse(xhr.response);

    const constructor = errors[error];

    callback(new constructor(message));
  };

  xhr.onerror = () => {
    callback(new SystemError("Network error: Unable to reach the server."));
  };

  xhr.open("GET", `http://localhost:8080/users/${username}`);

  xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`);
  xhr.send();
};

export default getUsersName;
