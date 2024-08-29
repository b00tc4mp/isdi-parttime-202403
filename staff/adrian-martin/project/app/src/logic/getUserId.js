import extractPayloadFromJWT from "../util/extractPayloadFromJWT"

const getUserId = () => {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return userId.toString()
}

export default getUserId