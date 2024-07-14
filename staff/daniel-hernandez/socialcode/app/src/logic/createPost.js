import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const createPost = (title, image, description) => {
  validate.text(title, "Title", 50);
  validate.url(image, "Image");
  validate.text(description, "Description", 200);

  return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      image,
      description,
    }),
  })
    .catch(() => {
      throw new SystemError("Server error");
    })
    .then((res) => {
      if (res.status === 201) return;

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

export default createPost;
