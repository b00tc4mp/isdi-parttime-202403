import errors, {SystemError} from 'com/errors'
import validate from 'com/validate'

const createPostComment = (postId, comment, callback) => {
    validate.text(comment, 'comment', 150)
    validate.id(postId)
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if(xhr.status === 201) {
            callback(null)

            return
        }
        const {error , message} = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open ('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)

    const body = {comment}

    const json = JSON.stringify(body)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.send(json)
}
export default createPostComment
