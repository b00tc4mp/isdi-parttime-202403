import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'


const getUserUsername = () => {
    const { sub: username } = extractPayloadFromJWT(sessionStorage.token)

    return username
}


export default getUserUsername

