import extractPayload from "../utils/extractPayload";

const getUserId = () => {
  const { sub: userId } = extractPayload(sessionStorage.token);
  return userId;
};

export default getUserId;
