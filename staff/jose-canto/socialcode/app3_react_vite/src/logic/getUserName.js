import errors, { SystemError } from "com/errors"
import extractPayloadFromJWT from "../utils/extractPayloadFromJWT.js"

const getUserName = () => {

  const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

  return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {

    method: "GET",
    headers: {
      "Authorization": `Bearer ${sessionStorage.token}`
    }
  })
    .catch(() => { throw new SystemError("connection error") })
    .then(response => {
      if (response.status === 200) {

        return response.json()
          .catch(error => { throw new SystemError("connection error") })
          .then(name => name)

      }

      return response.json()
        .catch(error => callback(new SystemError("connection error")))
        .then(body => {

          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })

}

export default getUserName