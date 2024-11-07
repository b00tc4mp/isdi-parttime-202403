import errors, { SystemError } from 'com/errors'

import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getUserChatsAndMessages = async () => {
  const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}chats/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
        },
      }
    )

    if (response.status === 200) return response.json()

    try {
      body = await response.json()
    } catch (jsonError) {
      throw new SystemError(`${response.statusText}`)
    }

    const { error, message } = body

    const constructor = errors[error]

    throw new constructor(message)
  } catch (error) {
    throw new SystemError('Server Error')
  }
}

export default getUserChatsAndMessages
