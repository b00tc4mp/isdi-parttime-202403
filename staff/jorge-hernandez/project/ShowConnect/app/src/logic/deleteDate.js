import errors, { SystemError } from 'com/errors'

const deleteDate = (artistId, dateToRemove) => {
  return fetch(
    `${import.meta.env.VITE_API_URL}users/${artistId}/dates/${dateToRemove}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.token}`,
      },
    }
  )
    .catch(() => {
      throw new SystemError('server error')
    })
    .then((response) => {
      if (response.status === 200) return
      return response
        .json()
        .catch(() => {
          throw new SystemError('server error')
        })
        .then((body) => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}

export default deleteDate
