import errors from "./errors"
import extractPayloadFormJWT from "./utils/extractPayloadFormJWT"
//desestructuramos para poder usar los errores
const { ContentError, MatchError } = errors
const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[\w-]+$/
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/
const ID_REGEX = /^[0-9]+-[0-9]+$/


//añadimos callback para avisar al registerForm que ha ido bien el proceso
logic.registerUser = (email, username, password, passwordRepeat, callback) => {

    if (!EMAIL_REGEX.test(email)) // .test funciona comprobamndo que el valor que lo pases contenga esos caracteres
        throw new ContentError("email is not valid")

    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError("password is not valid")

    if (password !== passwordRepeat)
        throw new MatchError("passwords don't match")

    if (typeof callback !== "function")
        throw new TypeError("callback is not a function")

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

logic.loginUser = (username, password, callback) => {
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

logic.isUserLoggedIn = () => !!sessionStorage.token

logic.logoutUser = () => delete sessionStorage.token

logic.getUsername = callback => {
    if (typeof callback !== "function")
        throw new TypeError("callback is not a function")

    const { sub: username } = extractPayloadFormJWT(sessionStorage.token)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const username = JSON.parse(xhr.response)

            callback(null, username)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open("GET", `http://localhost:8080/users/${username}`)

    xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)

    xhr.send()
}

logic.getPosts = callback => {
    if (typeof callback !== "function")
        throw new TypeError("callback is not a function")

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        // no hay nada que enviar, pro como respuesta hay que parsear los posts
        if (xhr.status === 200) {
            const posts = JSON.parse(xhr.response)
            callback(null, posts)

            return
        }
        const { error, message } = JSON.parse(xhr.response)
        //recuperamos la constructora del error para reconstruir el mensaje de error
        const constructor = errors[error]

        callback(new constructor(message))
    }
    xhr.open("GET", "http://localhost:8080/posts")

    xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)

    xhr.send()
}

logic.createPost = (title, image, description, callback) => {
    if (typeof title !== "string" || !title.length || title.length > 50)
        throw new ContentError("title is not valid")

    if (typeof image !== "string" || !image.startsWith("http"))
        throw new ContentError("image is not valid")

    if (typeof description !== "string" || !description.length || description.length > 5000)
        throw new ContentError("description is not valid")

    if (typeof callback !== "function")
        throw new TypeError("callback is not a function")

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 201) {
            callback(null)

            return
        }
        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open("POST", "http://localhost:8080/posts/")

    xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)
    const body = {
        //author: sessionStorage.username,--> enviamos la cabecera en authorization
        title,
        image,
        description
        //date: fechaFormateada-->la hacemos desde logic
    }

    const json = JSON.stringify(body)

    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(json)
}

//extraemos el usename del token
logic.getLoggedInUsername = () => {
    //y del objeto, sacamos el el username que viene en sub
    const { sub: username } = extractPayloadFormJWT(sessionStorage.token)

    return username
}

logic.deletePost = (postId, callback) => {
    if (!ID_REGEX.test(postId))
        throw new ContentError("post id is not valid")

    if (typeof callback !== "function")
        throw new TypeError("callback is not a function")

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            callback(null)

            return
        }
        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open("DELETE", `http://localhost:8080/posts/${postId}`)

    xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)

    xhr.send()
}

export default logic
