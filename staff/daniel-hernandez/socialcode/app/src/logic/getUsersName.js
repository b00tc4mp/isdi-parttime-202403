import errors, { SystemError } from "com/errors";
import validate from "com/validate";
import extractPayload from "../utils/extractPayload";

const getUsersName = (callback) => {
  validate.callback(callback);

  const { sub: userId } = extractPayload(sessionStorage.token);

  fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json().then(({ name }) => callback(null, name));
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

export default getUsersName;
