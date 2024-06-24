import errors from "../errors";
const { ContentError } = errors;

const ID_REGEX = /^[a-z0-9]+[a-z0-9]{5}$/;

const deletePost = (id, callback) => {
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

    const { error, message } = JSON.parse(xhr.response);

    const constructor = errors[error];

    callback(new constructor(message));
  };

  xhr.onerror = () => {
    callback(new SystemError("Network error: Unable to reach the server."));
  };

  xhr.open("DELETE", `http://localhost:8080/posts/${id}`);

  xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`);
  xhr.send();
};

export default deletePost;
