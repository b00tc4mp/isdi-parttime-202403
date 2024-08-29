import validate from 'com/validate'
import errors, { SystemError } from 'com/errors'

const deleteGame = (gameId) => {
    validate.id(gameId, 'gameId')

    if (!gameId) throw new SystemError('gameIs is undefined or null')

    return fetch(`${import.meta.env.VITE_API_URL}/games/${gameId}`, {
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