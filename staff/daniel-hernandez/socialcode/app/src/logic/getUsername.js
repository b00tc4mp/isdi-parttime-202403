import extractPayload from "../utils/extractPayload";

const getUsername = () => {
  const { sub: username } = extractPayload(sessionStorage.token);
  return username;
};

export default getUsername;
