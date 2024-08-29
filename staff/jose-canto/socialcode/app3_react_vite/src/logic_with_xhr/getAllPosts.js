import errors from "com/errors"
import validate from "com/validate"

const getAllPosts = (page, limit, callback) => {
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

  xhr.onerror = () => {
    callback(new SystemError("Network error"))
  }

  const url = new URL(`${import.meta.env.VITE_API_URL}/posts?page=${page}&limit=${limit}`)
  // url.searchParams.append("page", page)
  // url.searchParams.append("limit", limit)


  xhr.open("GET", url)
  xhr.setRequestHeader("Authorization", `Bearer ${sessionStorage.token}`)
  xhr.send()
}

export default getAllPosts