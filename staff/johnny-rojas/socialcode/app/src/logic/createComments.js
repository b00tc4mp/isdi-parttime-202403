import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const createComment = (postId, comment) => {
  validate.id(postId, 'postId')
  validate.text(comment, 'comment', 200)


  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({ postId, comment })
  })
    .catch(() => { throw new SystemError('network error') })
    .then(response => { 
      if (response.status === 201) return

      return response.json()
        .catch(() => { throw new SystemError('network error')})
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })

    })

}

export default createComment