import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const getPostComments = (postId, callback) => {
  validate.id(postId, "postId")
  validate.callback(callback)

  fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
    mehtod: "GET",
    headers: {
      "Authorization": `Bearer ${sessionStorage.token}`
    },
  })

    .then(response => {
      if (response.status === 200) {
        return response.json()
          .then(comments => callback(null, comments))
          .catch(error => callback(error))
      }

      return response.json()
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          callback(new constructor(message))
        })
    })
    .catch(error => callback(new SystemError(error)))

}

export default getPostComments