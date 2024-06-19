import errors from "../error.js"

const { ContentError } = errors

const createPost = (title, image, description, callback) => {
  if (typeof title !== "string" || !title.length || title.length > 30) {
    throw new ContentError("Title is not valid")
  }

  if (typeof image !== "string" || !image.startsWith("http")) {
    throw new ContentError("Image is not valid")
  }

  if (typeof description !== "string" || !description.length || description.length > 600) {
    throw new ContentError("Description is not valid")
  }

  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function")
  }

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

  xhr.open("POST", "http://localhost:8080/posts")
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