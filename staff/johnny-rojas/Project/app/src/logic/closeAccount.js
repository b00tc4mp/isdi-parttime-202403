import errors, { SystemError } from 'com/errors';
import validate from 'com/validate';

const closeAccount = (userId) => {
  validate.id(userId, 'userId')

  return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/manage`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
      'Content-Type': 'application/json'
    }
  })

    .catch(() => { throw new SystemError('network error') })
    .then(response => {
      if (response.status === 204) return
      
      return response.json()
        .catch(() => { throw new SystemError('network error') })
        .then(body => {
          const { error, message } = body
          
          const constructor = errors[error]

          throw new constructor(message)
      })
  })

}

export default closeAccount