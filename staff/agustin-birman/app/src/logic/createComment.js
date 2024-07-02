import errors from "com/errors"
import validate from "com/validate"

const createComment = (textComment, postId, callback) => {
    validate.text(textComment, 'textComment', 200)
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

    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)

    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

    const body = {
        textComment
    }

    const json = JSON.stringify(body)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(json)
}

export default createComment