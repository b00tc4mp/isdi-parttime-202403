import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const deletePost = (id, callback) => {
  validate.id(id, "post ID");
  validate.callback(callback);

  fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
    },
  })
    .then((res) => {
      if (res.status === 204) {
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

export default deletePost;
