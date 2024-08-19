import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'
function getUserRole() {
    const { role } = extractPayloadFromJWT(sessionStorage.token)

    return role
}

export default getUserRole