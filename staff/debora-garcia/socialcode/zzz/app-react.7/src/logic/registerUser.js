import errors from "com/errors"
import validate from "com/validate"


const registerUser = (email, username, password, passwordRepeat, callback) => {
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 201) {
            callback(null)

            return
        }
        // reconstruimos el error usando el mapeo de errores
        const { error, message } = JSON.parse(xhr.response)
        // usamos los errores en la api
        const constructor = errors[error]
        callback(new constructor(message))
    }
    xhr.open("POST", "http://localhost:8080/users")

    const user = { username, email, password, passwordRepeat }

    const json = JSON.stringify(user)

    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(json)
}

export default registerUser