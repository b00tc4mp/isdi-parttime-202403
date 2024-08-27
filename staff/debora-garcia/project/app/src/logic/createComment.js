import errors, { SystemError } from "com/errors"
import validate from "com/validate"
const createComment = (postId,text) => {
    validate.id(postId, "postId")
    validate.text(text, "text", 100)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify({ text })
    })
        .catch(() => { throw new SystemError("server error") })
        .then(response => {
            if (response.status === 201) return
            return response.json()
                .catch(() => { throw new SystemError("server error") })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })

}

export default createComment