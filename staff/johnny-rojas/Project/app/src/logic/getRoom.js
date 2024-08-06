import errors, { SystemError } from 'com/errors'

const getRoom = (roomId) => {
  return fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sesionStorage.token}`
    }
  })

    .catch(() => { throw new SystemError('network error') })
    .then(response => {
      if (response.status === 200) {
        return response.json()
          .then(room => room)
        .catch(error => {throw new SystemError(error.message)})
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

export default getRoom