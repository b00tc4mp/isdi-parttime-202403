import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const editPostTitle = (postId, title) => {
  validate.id(postId, "postId")
  validate.text(title, "title")

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/edit`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ title })
  })
    .catch(() => { throw new SystemError("connection error") })
    .then(response => {
      if (response.status === 200) return


      return response.json()
        .catch(() => { throw new SystemError("connection error") })
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}
export default editPostTitle