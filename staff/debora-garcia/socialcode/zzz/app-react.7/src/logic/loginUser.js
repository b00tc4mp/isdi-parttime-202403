import errors from "com/errors"

import validate from "com/validate"

const loginUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    //autentificacion la hace la api
    const xhr = new XMLHttpRequest
    // se configura pero no se ejecuta
    xhr.onload = () => {
        if (xhr.status === 200) {
            //sessionStorage.username = username

            const token = JSON.parse(xhr.response)
            sessionStorage.token = token

            callback(null)

            return
        }
        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }
    //conectamos la app con la api
    xhr.open("POST", `${import.meta.env.VITE_API_URL}/users/auth`)

    const user = { username, password }

    const json = JSON.stringify(user)

    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(json)
}

export default loginUser