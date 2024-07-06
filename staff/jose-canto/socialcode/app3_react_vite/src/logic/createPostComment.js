import errors, { SystemError } from "com/errors"
import validate from "com/validate"


const createPostComment = (postId, textComment, callback) => {
  validate.id(postId)
  validate.text(textComment, "comments", 150)
  validate.callback(callback)

  fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${sessionStorage.token}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify({ postId, text: textComment })

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
        .catch(error => callback(new SystemError(error)))



    })
    .catch(error => callback(new SystemError(error)))
}

export default createPostComment