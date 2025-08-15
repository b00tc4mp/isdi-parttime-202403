import errors from "../errors"

const { ContentError } = errors

const ID_REGEX = /^[0-9]+-[0-9]+$/

const deletePost = (postId, callback) => {
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

export default deletePost
