import validate from "com/validate.js"
import errors, { SystemError } from "com/errors.js"


const registerUser = (fullname, username, email, password, passwordRepeat) => {

  validate.name(fullname, "full name")
  validate.username(username)
  validate.email(email)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  const body = { fullname, username, email, password, passwordRepeat }

  return fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })

    .catch(() => { throw new SystemError("connection error") })
    .then(response => {
      if (response.status === 201) {
        console.log("user registered")
        return
      }

      return response.json()
        .catch(() => { throw new SystemError("connection error") })
        .then(body => {
          const { error, message } = body
          const constructor = errors[error]
          throw new constructor(message)
        })
    })
}

export default registerUser