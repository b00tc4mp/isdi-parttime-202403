import validate from 'com/validate'
import errors, { SystemError } from 'com/errors'

const editRoom = (userId, roomId, updates) => {
  validate.id(userId, 'userId')
  validate.id(roomId, 'roomId')

  if (updates.nameRoom) {
    validate.nameRoom(updates.nameRoom)
  }
  if (updates.region) {
    validate.region(updates.region)
  }
  if (updates.city) {
    validate.text(updates.city)
  }
  if (updates.image) {
    validate.url(updates.image)
  }
  if (updates.description) {
    validate.text(updates.description)
  }
  if (updates.price) {
    validate.price(updates.price)
  }

  return fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}/manage`, {
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

export default editRoom



//TODO revisar los estados de venezuela y mejorar la validacion 