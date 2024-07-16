import { SystemError } from "com/errors"
import validate from "com/validate"

const editPostTitle = (postId, title) => {
  validate.id(postid, "postId")
  validate.text(title, "title")

  return fetch(`${import.meta.env.VITE_API_URL}/post/${postId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    },

    body: JSON.stringify({ postId, title })
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