import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const getAllPosts = (page, limit) => {
  validate.number(page, "Page");
  validate.number(limit, "Limit");

  return fetch(
    `${import.meta.env.VITE_API_URL}/posts?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
    },
  )
    .catch(() => {
      throw new SystemError("Server error");
    })
    .then((res) => {
      if (res.status === 200) {
        return res
          .json()
          .catch(() => {
            throw new SystemError("Server error");
          })
          .then((postInfo) => postInfo);
      }

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

export default getAllPosts;
