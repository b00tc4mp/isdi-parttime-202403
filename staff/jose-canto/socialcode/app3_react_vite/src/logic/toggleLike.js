import errors from 'com/errors';

const { ContentError } = errors;

const toggleLike = (postId, callback) => {
  if (typeof postId !== 'string' || !postId.length) {
    throw new ContentError('Post ID is not valid');
  }

  if (typeof callback !== 'function') {
    throw new TypeError('callback is not a function');
  }

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      const liked = JSON.parse(xhr.response);
      callback(null, liked);
      return;
    }

    const { error, message } = JSON.parse(xhr.response);
    const constructor = errors[error];
    callback(new constructor(message));
  };

  xhr.open('POST', `http://localhost:8080/posts/${postId}/like`);
  xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.send();
};

export default toggleLike;
