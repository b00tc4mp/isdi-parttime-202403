import errors from "../errors"

const getPosts = callback => {
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

export default getPosts
