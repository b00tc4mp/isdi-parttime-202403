import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const deletePost = (id) => {
  validate.id(id, "post ID");

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
    },
  })
    .catch(() => {
      throw new SystemError("Server error");
    })
    .then((res) => {
      if (res.status === 204) return;

      return res
        .json()
        .catch(() => {
          throw new SystemError("Server error");
        })
        .then((body) => {
          const { error, message } = body;
          const constructor = errors[error];

          throw new constructor(message);
        });
    });
};

export default deletePost;
