import errors, { SystemError } from "com/errors";
import validate from "com/validate";

const loginUser = (username, password) => {
  validate.username(username, "Username");
  validate.password(password);

  return (async () => {
    let res, tokenObj, body;

    try {
      res = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
    } catch {
      throw new SystemError("Server errror");
    }

    if (res.status === 200) {
      try {
        tokenObj = await res.json();
      } catch {
        throw new SystemError("Server error");
      }

      const { token } = tokenObj;
      sessionStorage.token = token;
      return;
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

export default loginUser;
