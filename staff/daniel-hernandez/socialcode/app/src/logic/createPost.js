import errors from "../errors";
const { ContentError } = errors;

const createPost = (title, image, description, callback) => {
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

    const { error, message } = JSON.parse(xhr.response);
    const constructor = errors[error];

    callback(new constructor(message));
  };

  xhr.onerror = () => {
    callback(new SystemError("Network error: Unable to reach the server."));
  };

  xhr.open("POST", "http://localhost:8080/posts");
  xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`);

  const body = {
    title,
    image,
    description,
  };

  const json = JSON.stringify(body);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(json);
};

export default createPost;
