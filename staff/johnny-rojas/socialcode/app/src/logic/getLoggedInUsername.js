import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getLoggedInUsername = () => {
    const { sub: username } = extractPayloadFromJWT(sessionStorage.token)

    return username
}

export default getLoggedInUsername