import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getUserRole = () => {
    const { role: userRole } = extractPayloadFromJWT(sessionStorage.token)

    return userRole
}

export default getUserRole