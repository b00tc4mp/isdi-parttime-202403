import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const createPost = (title, image, description) => {
  validate.text(title, "title", 30)
  validate.url(image, "image")
  validate.text(description, "description", 500)


  return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${sessionStorage.token}`,
      "content-Type": "application/json"
    },
    body: JSON.stringify({ title, image, description })
  })
    .catch(() => { throw new SystemError("connection error") })
    .then(response => {
      if (response.status === 201) {
        return
      }

      return response.json()
        .catch(() => { throw new SystemError("connection error") })
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}

export default createPost