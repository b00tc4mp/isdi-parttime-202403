import errors from "com/errors"
import validate from "com/validate"

const getAllPosts = (callback) => {
  validate.callback(callback)

  const xhr = new XMLHttpRequest
  xhr.onload = () => {

    if (xhr.status === 200) {
      const posts = JSON.parse(xhr.response)

      callback(null, posts)
      return

    }
    const { error, message } = JSON.parse(xhr.response)

    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.open("GET", "http://localhost:8080/posts")
  xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)
  xhr.send()
}

export default getAllPosts