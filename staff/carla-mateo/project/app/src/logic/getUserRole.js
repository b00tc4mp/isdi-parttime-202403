import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

export default function getUserRole() {
    const { role } = extractPayloadFromJWT(sessionStorage.token)

    return role
}

