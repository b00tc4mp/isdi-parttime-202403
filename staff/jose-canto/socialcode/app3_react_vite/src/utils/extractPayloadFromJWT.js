import errors from "../error.js"

const { ContentError, MatchError } = errors

const JWT_REGEX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

function extractPayloadFromJWT(token) {
  if (!JWT_REGEX.test(token)) {
    throw new ContentError("token is not valid");
  }

  //const [, payload64] = sessionStorage.token.split('.')
  // Divide el token en sus partes y obtiene directamente la segunda parte (payload)
  const payload64 = token.split(".")[1];

  const payloadJSON = atob(payload64);
  const payload = JSON.parse(payloadJSON); // const payload = [{sub: "Jack", iat: 1660000000, exp: 1660000000}]
  const { exp } = payload; // const exp = [{exp: 1660000000}]

  const nowSeconds = Date.now() / 1000;

  if (nowSeconds >= exp) {
    throw new MatchError("token expired");
  }

  return payload; //const payload = [{ sub: "Jack", iat: 1660000000, exp: 1660000000 }]
}

export default extractPayloadFromJWT