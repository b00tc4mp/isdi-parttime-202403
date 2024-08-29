import errors from "com/errors";
const { ContentError, MatchError } = errors

const JWT_REGEX = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/

function extractPayloadFromJWT(token) {
    if (!JWT_REGEX.test(token)) throw new ContentError('invalid jwt')

    const [, payload64] = sessionStorage.token.split('.')

    const payloadJSON = atob(payload64)

    const payload = JSON.parse(payloadJSON)

    const { exp } = payload

    const nowSeconds = Date.now() / 1000

    if (nowSeconds >= exp) throw new MatchError('token expired')

    return payload
}

export default extractPayloadFromJWT