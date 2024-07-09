import errors, { SystemError } from "com/errors"
import extractPayloadFromJWT from "../utils/extractPayloadFromJWT.js"
import validate from "com/validate"

const getUserName = (callback) => {
  validate.callback(callback)

  const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)


  fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {

    method: "GET",
    headers: {
      "Authorization": `Bearer ${sessionStorage.token}`
    }
  })
    .then(response => {
      if (response.status === 200) {

        return response.json()
          .then(name => callback(null, name))
          .catch(error => callback(new SystemError(error.message)))

      }

      return response.json()
        .then(body => {

          const { error, message } = body

          const constructor = errors[error]

          callback(new constructor(message))
        })
        .catch(error => callback(new SystemError(error.message)))
    })
    .catch(error => callback(new SystemError(error.message)))

}

export default getUserName