import validate from 'com/validate';
import errors, { SystemError } from 'com/errors';

const editUserContact = (userId, updates) => {
  validate.id(userId, 'userId')

  if (updates.email) {
    validate.email(updates.email)
  }
  if (updates.phone) {
    validate.phone(updates.phone)
  }

  return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/manage`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  })
    .catch(() => { throw new SystemError('network error') })
    .then(response => {
      if (response.status === 200) return

      return response.json()
        .catch(() => { throw new SystemError('network error') })
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}

export default editUserContact