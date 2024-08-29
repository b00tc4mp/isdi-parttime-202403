import errors from 'com/errors';
import validate from "com/validate"


const toggleLike = (postId, callback) => {
  validate.id(postId, 'postId');
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
  }

  xhr.onerror = () => {
    callback(new SystemError("Network error"))
  }

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/like/${postId}`);
  xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`);

  xhr.send();
};

export default toggleLike;
