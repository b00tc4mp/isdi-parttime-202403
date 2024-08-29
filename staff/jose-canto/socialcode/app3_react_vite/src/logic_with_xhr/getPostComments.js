import errors from "com/errors"
import validate from "com/validate"

const getPostComments = (postId, callback) => {
  validate.id(postId, "postId")
  validate.callback(callback)

  const xhr = new XMLHttpRequest()

  xhr.onload = () => {
    if (xhr.status === 200) {

      const comments = JSON.parse(xhr.response)

      callback(null, comments)
      return
    }

    const { error, message } = JSON.parse(xhr.response)

    const constructor = errors[error]

    callback(new constructor(message))
  }

  xhr.onerror = () => {
    callback(new SystemError("Network error"))
  }

  const url = new URL(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)
  xhr.open("GET", url)
  xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)
  xhr.send()

}

export default getPostComments