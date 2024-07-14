import errors, { SystemError } from "com/errors";
import extractPayload from "../utils/extractPayload";

const getUsersName = () => {
  const { sub: userId } = extractPayload(sessionStorage.token);

  return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
    },
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
          .then(({ name }) => name);
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

export default getUsersName;
