import errors from "com/errors"

const { ContentError, MatchError } = errors

const JWT_REGEX = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/


function extractPayloadFormJWT(token) {
    //validamos que el regex que a nivel de caracteres sea correcto
    if (!JWT_REGEX.test(sessionStorage.token)) throw new ContentError("invalid jwt")
    // hacemos destructuring del array (que tiene 3 partes)
    const [, payload64] = sessionStorage.token.split(".")
    // convertimos a JSON, decodificamos en vase 64
    const payloadJSON = atob(payload64)
    // el json lo convertimos a objeto
    const payload = JSON.parse(payloadJSON)
    const { exp } = payload
    // paraq comprobar que el token no ha expirado sacamos tambien exp(fecha en milisegundos de expiracion del token)
    const nowSeconds = Date.now() / 1000
    //  comparamos que Date now en milisegundos ex mayor que exp, entonces token expirado
    if (nowSeconds >= exp) throw new MatchError("token expired")

    return payload
}

export default extractPayloadFormJWT