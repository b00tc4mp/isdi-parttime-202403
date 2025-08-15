import extractPayloadFormJWT from "../utils/extractPayloadFormJWT"

const getUserId = () => {
    //y del objeto, sacamos el el username que viene en sub
    const { sub: userId } = extractPayloadFormJWT(sessionStorage.token)

    return userId
}

export default getUserId
