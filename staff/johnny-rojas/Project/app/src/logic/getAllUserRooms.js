import error, { SystemError } from 'com/errors'


const getAllUserRooms = () => {
  return fetch(`${import.meta.env.VITE_API_URL}/rooms/${userId}/rooms`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`
    }
  })

    .catch(() => { throw new SystemError('network error') })
    .then(response => {
      if (response.status === 200) {
        return response.json()
          .then(rooms => rooms)
          .catch(error => { throw new SystemError(error.message) })
      }

      return response.json()
        .catch(() => { throw new SystemError('network error') })
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}

export default getAllUserRooms
