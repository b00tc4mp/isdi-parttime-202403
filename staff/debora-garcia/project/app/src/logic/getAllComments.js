import errors, { SystemError } from "com/errors"
import validate from "com/validate"
const getAllComments = (postId) => {
    validate.id(postId, "postId")

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${sessionStorage.token}` }

    })
        .catch(() => { throw new SystemError("server error") })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError("server error") })
                    .then(comments => comments)
            }
            return response.json()
                .catch(() => { throw new SystemError("server error") })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })

}

export default getAllComments