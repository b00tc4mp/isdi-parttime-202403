import errors, { SystemError } from "com/errors";


const getRoomBookings = (roomId) => {

  return fetch(`${import.meta.env.VITE_API_URL}/bookings/${roomId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer${sessionStorage.token}`,
      'Content-Type': 'application/json'
    }
  })

    .catch(() => { throw new SystemError('network error') })
    .then(response => {
      if (response.status === 200) {
        return response.json()
          .then(bookings => bookings)
          .catch(error => { throw new SystemError(error.mesage) })
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

export default getRoomBookings