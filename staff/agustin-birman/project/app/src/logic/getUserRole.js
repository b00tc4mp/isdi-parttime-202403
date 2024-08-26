import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getUserRole = () => {
    const { role } = extractPayloadFromJWT(localStorage.token)

    return role
}

export default getUserRole