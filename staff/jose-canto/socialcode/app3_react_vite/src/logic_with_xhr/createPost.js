import errors from "com/errors"
import validate from "com/validate"


const createPost = (title, image, description, callback) => {
  validate.text(title, "title", 30)
  validate.url(image, "image")
  validate.text(description, "description", 500)
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

  xhr.open("POST", `${import.meta.env.VITE_API_URL}/posts`)
  xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)
  xhr.setRequestHeader("Content-Type", "application/json")

  const body = {
    title: title,
    image: image,
    description: description,

  };

  const json = JSON.stringify(body)
  xhr.send(json)
}

export default createPost