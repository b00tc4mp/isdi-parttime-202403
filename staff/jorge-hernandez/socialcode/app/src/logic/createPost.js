import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createPost = (title, image, description) => {
  validate.text(title)
  validate.url(image)
  validate.text(description)

  return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.token}`,
    },
    body: JSON.stringify({ title, image, description }),
  })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((response) => {
      if (response.status === 201) {
        return
      }
      return response.json().then(({ error, message }) => {
        const constructor = errors[error]
        throw new constructor(message)
      })
    })
}

export default createPost
