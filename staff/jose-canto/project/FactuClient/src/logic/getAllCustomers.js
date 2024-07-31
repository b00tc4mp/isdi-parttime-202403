import errors, { SystemError } from "com/errors.js"

const getAllCustomers = () => {

  return fetch(`${import.meta.env.VITE_API_URL}/customers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }
  })

    .catch(() => { throw new SystemError("connection error") })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
          .then(customers => { return customers })
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

export default getAllCustomers