import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const createBooking = (userId, roomId, startDate, endDate) => {
  validate.id(userId, 'userId')
  validate.id(roomId, 'roomId')

  return fetch(`${import.meta.env.VITE_API_URL}/create-booking/${roomId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ startDate, endDate })
  })

    .catch(() => { throw new SystemError('network error') })
    .then(response => {
      if (response.status === 201) {
        return response.json()
          .catch(() => { throw new SystemError('network error') })
          .then(blockedDates => blockedDates)
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

export default createBooking