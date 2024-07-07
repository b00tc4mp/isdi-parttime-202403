import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const getAllPosts = (page, limit, callback) => {
  validate.number(page, "Page");
  validate.number(limit, "Limit");
  validate.callback(callback);

  fetch(`${import.meta.env.VITE_API_URL}/posts?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((postInfo) => callback(null, postInfo));
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

export default getAllPosts;
