import extractPayloadFromJWT from "../utils/extractPayloadFromJWT"

const getUserId = () => {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return userId
}

export default getUserId