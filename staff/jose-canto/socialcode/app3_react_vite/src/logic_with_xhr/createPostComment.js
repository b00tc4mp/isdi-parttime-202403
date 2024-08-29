import errors from "com/errors"
import validate from "com/validate"


const createPostComment = (postId, textComment, callback) => {
  validate.id(postId)
  validate.text(textComment, "comments", 150)
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

  xhr.onerror = () => {
    callback(new SystemError("Network error"))
  }

  xhr.open("PATCH", `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)
  xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)
  xhr.setRequestHeader("Content-Type", "application/json")

  const body = {
    text: textComment,
  }

  const json = JSON.stringify(body)
  xhr.send(json)
}

export default createPostComment