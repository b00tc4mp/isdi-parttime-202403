import extractPayloadFromJWT from "../utils/extractPayloadFromJWT.js"

const getUserId = () => {
  const payload = extractPayloadFromJWT(sessionStorage.token)

  const { sub: userId } = payload

  return userId
}

export default getUserId