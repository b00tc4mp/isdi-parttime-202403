import errors from "com/errors"
import validate from "com/validate"


const createComment = (postId, textComment, callback) => {
  validate.text(textComment, "comments", 200)
  validate.callback(callback)

  const xhr = new XMLHttpRequest
  xhr.onload = () => {
    if (xhr.status === 201) {

      const newComment = JSON.parse(xhr.response)

      callback(null, newComment)

      return
    }
    const { error, message } = JSON.parse(xhr.response)

    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.open("PATCH", `${import.meta.env.VITE_API_URL}/posts/comments/${postId}`)
  xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)
  xhr.setRequestHeader("Content-Type", "application/json")

  const body = {
    text: textComment,
  }

  const json = JSON.stringify(body)
  xhr.send(json)
}

export default createComment