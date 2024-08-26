import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getUserId = () => {
    const { sub: userId } = extractPayloadFromJWT(localStorage.token)

    return userId
}

export default getUserId