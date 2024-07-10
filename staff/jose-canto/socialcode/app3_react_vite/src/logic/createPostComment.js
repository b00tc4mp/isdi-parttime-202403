import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const createPostComment = (postId, textComment) => {
  validate.id(postId)
  validate.text(textComment, "comments", 150)

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${sessionStorage.token}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify({ postId, text: textComment })

  })
    .catch(error => { throw new SystemError(error) })
    .then(response => {
      if (response.status === 201) {
        return
      }

      return response.json()
        .catch(error => { throw new SystemError(error) })
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}

export default createPostComment