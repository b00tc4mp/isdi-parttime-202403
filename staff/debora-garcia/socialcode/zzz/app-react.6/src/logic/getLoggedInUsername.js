import extractPayloadFormJWT from "../utils/extractPayloadFormJWT"

const getLoggedInUsername = () => {
    //y del objeto, sacamos el el username que viene en sub
    const { sub: username } = extractPayloadFormJWT(sessionStorage.token)

    return username
}

export default getLoggedInUsername
