import errors, { SystemError } from "com/errors";
import extractPayload from "../utils/extractPayload";

const getUsersName = () => {
  const { sub: userId } = extractPayload(sessionStorage.token);

  return (async () => {
    let res, nameObj, body;

    try {
      res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
        },
      });
    } catch {
      throw new SystemError("Server error");
    }

    if (res.status === 200) {
      try {
        nameObj = await res.json();
      } catch {
        throw new SystemError("Server error");
      }

      const { name } = nameObj;
      return name;
    }

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

export default getUsersName;
