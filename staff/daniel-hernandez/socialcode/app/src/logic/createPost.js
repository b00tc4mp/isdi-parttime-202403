import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const createPost = (title, image, description, callback) => {
  validate.text(title, "Title", 50);
  validate.url(image, "Image");
  validate.text(description, "Description", 200);
  validate.callback(callback);

  fetch(`${import.meta.env.VITE_API_URL}/posts`, {
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
    .then((res) => {
      if (res.status === 201) {
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

export default createPost;
