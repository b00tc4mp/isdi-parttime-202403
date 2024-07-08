import errors, { SystemError } from "com/errors"
import validate from "com/validate"


const registerUser = (email, username, password, passwordRepeat, callback) => {
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.callback(callback)

    /* const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 201) {
            callback(null)

            return
        }
        try {
            const { error, message } = JSON.parse(xhr.response)

            const constructor = errors[error]

            callback(new constructor(message))
        } catch (error) {
            callback(new SystemError(error.message))
        }
    }
    //añadimos controlar los errores en caso que haya fallo de la red
    xhr.onerror = () => callback(new SystemError("network error"))

    xhr.open("POST", `${import.meta.env.VITE_API_URL}/users`)

    const body = { username, email, password, passwordRepeat }

    const json = JSON.stringify(body)

    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(json)
 */
    fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, email, password, passwordRepeat }),

    })
        .then(response => {
            if (response.status === 201) {
                callback(null)

                return
            }
            //controlar si la api no devuelve un json controlar el error. Es una promesa encadenada
            return response.json()
                .then((body) => {
                    const { error, message } = body

                    const constructor = errors[error]
                    
                    callback(new constructor(message))

                }) // respuesta en forma de objeto
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default registerUser