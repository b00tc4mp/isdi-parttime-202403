import errors from "com/errors";
import validate from "com/validate";

const createPost = (title, image, description, callback) => {
  validate.text(title, "Title", 50);
  validate.url(image, "Image");
  validate.text(description, "Description", 200);
  validate.callback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 201) {
      callback(null);

      return;
    }

    const { error, message } = JSON.parse(xhr.response);
    const constructor = errors[error];

    console.log(error, message);
    callback(new constructor(message));
  };

  xhr.open("POST", `${import.meta.env.VITE_API_URL}/posts`);
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
