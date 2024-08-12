import { } from 'dotenv/config'
import validate from 'com/validate'
import { SystemError } from 'com/errors'

const deleteGame = (userId, gameId) => {
    validate.id(userId, 'userId')
    validate.id(gameId, 'gameId')

    return fetch(`${import.meta.env.VITE_API_URL}/games/${gameId}/edit`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('Server error') })
        .then(response => {
            if (response.status === 204) return

            return response.json()
                .catch(() => { throw new SystemError('Server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default deleteGame