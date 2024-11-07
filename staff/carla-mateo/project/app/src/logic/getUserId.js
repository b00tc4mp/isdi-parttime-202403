import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

export default function getUserId() {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return userId
}
