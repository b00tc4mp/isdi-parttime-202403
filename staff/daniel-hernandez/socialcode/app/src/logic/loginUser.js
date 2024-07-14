import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const loginUser = (username, password) => {
  validate.username(username, "Username");
  validate.password(password);

  return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
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
          .then(({ token }) => (sessionStorage.token = token));
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

export default loginUser;
