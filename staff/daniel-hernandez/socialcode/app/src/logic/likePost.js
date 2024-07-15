import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const likePost = (id) => {
  validate.id(id, "Post ID");

  return (async () => {
    let res, body;

    try {
      res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}/likes`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
        },
      });
    } catch {
      throw new SystemError("Server error");
    }

    if (res.status === 204) return;

    try {
      body = await res.json();
    } catch {
      throw new SystemError("Server error");
    }

    const { error, message } = body;
    const constructor = errors[error];

    throw new constructor(message);
  })();
};

export default likePost;
