import errors from "com/errors";
const { ContentError, MatchError } = errors;

const JWT_REGEX = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

function extractPayload(token) {
  if (!JWT_REGEX.test(token)) throw new ContentError("invalid token");

  const [, payload64] = token.split(".");
  const payloadJSON = atob(payload64);

  const payload = JSON.parse(payloadJSON);

  const { exp } = payload;

  const secondsNow = Date.now() / 1000;

  if (secondsNow >= exp) throw new MatchError("token expired");

  return payload;
}

export default extractPayload;
