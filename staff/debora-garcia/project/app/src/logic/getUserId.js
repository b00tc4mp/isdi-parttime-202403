import extractPayloadFormJWT from "../utils/extractPayloadFormJWT"

const getUserId = () => {
    const { sub: userId } = extractPayloadFormJWT(sessionStorage.token)

    return userId
}

export default getUserId