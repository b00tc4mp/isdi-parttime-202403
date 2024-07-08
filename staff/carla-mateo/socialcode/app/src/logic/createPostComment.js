import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createPostComment = (postId, comment, callback) => {
    validate.id(postId, 'postId')
    validate.text(comment, 'comment', 100)
    validate.callback(callback)

    fetch(`${import.meta.env.VITE_API_URL}/posts/comments`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId, comment })

    })
        .then(response => {
            if (response.status === 201) {
                callback(null)

                return
            }

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    callback(new constructor(message))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))

}

export default createPostComment