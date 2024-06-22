import errors from "com/errors"
import extractPayloadFromJWT from "../utils/extractPayloadFromJWT.js"
import validate from "com/validate"

const getUserName = (callback) => {

  validate.callback(callback)

  const { sub: username } = extractPayloadFromJWT(sessionStorage.token) //const payload = [{ sub: "Jack", iat: 1660000000, exp: 1660000000 }]


  const xhr = new XMLHttpRequest

  xhr.onload = () => {
    if (xhr.status === 200) {

      const name = JSON.parse(xhr.response)


      callback(null, name)

      return
    }

    const { error, message } = JSON.parse(xhr.response)

    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.open("GET", `${import.meta.env.VITE_API_URL}/users/${username}`)
  xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)

  xhr.send()
}

export default getUserName