import errors from "com/errors"
import validate from "com/validate"

const createPost = (title, image, description, callback) => {
    validate.text(title, "title", 50)
    validate.url(image, "image")
    validate.text(description, "description", 500)
    validate.callback(callback)

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

export default createPost