import errors from "com/errors";
import validate from "com/validate";

const likePost = (id, callback) => {
  validate.id(id, "Post ID");
  validate.callback(callback);

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

  xhr.open("PATCH", `${import.meta.env.VITE_API_URL}/posts/${id}/likes`);

  xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`);

  xhr.send();
};

export default likePost;
