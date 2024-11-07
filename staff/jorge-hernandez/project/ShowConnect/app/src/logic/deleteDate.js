import errors, { SystemError } from 'com/errors'

const deleteDate = async (artistId, dateToRemove) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }users/artists/${artistId}/dates/${dateToRemove}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.token}`,
        },
      }
    )

    if (response.status === 200) return

    try {
      body = await response.json()
    } catch (jsonError) {
      throw new SystemError(`${response.statusText}`)
    }

    const { error, message } = body

    const constructor = errors[error]

    throw new constructor(message)
  } catch (error) {
    throw new SystemError('Server error')
  }
}

export default deleteDate
