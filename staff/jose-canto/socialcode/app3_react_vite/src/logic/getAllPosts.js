import errors, { SystemError } from "com/errors"

const getAllPosts = (page, limit) => {

  return fetch(`${import.meta.env.VITE_API_URL}/posts?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${sessionStorage.token}`
    }
  })
    .catch(() => callback(new SystemError("connection error")))
    .then(response => {
      if (response.status === 200) {
        return response.json()
          .then(posts => { return posts })
          .catch(() => { throw new SystemError("connection error") })
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
export default getAllPosts