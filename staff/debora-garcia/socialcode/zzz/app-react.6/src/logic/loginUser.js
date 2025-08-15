import errors from "../errors"
const { ContentError } = errors

const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/


const loginUser = (username, password, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError("password is not valid")

    if (typeof callback !== "function")
        throw new TypeError("callback is not a function")

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
    xhr.open("POST", "http://localhost:8080/users/auth")

    const user = { username, password }

    const json = JSON.stringify(user)

    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(json)
}

export default loginUser