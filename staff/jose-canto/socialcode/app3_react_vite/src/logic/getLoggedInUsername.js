import extractPayloadFromJWT from "../utils/extractPayloadFromJWT.js"

const getLoggedInUsername = () => {
  const payload = extractPayloadFromJWT(sessionStorage.token)

  const { sub: username } = payload

  return username
}

export default getLoggedInUsername