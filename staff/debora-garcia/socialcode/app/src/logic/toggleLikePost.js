import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const toggleLikePost = (postId, callback) => {
    validate.id(postId, "postId")
    validate.callback(callback)

    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/likes`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .then(response => {
            if (response.status === 200) {
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

export default toggleLikePost