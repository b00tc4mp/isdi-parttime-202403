import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const getAllGamesTargetUser = (targetUserId) => {
    validate(targetUserId, 'targetUserId')

    return fetch(`${import.meta.env.VITE_API_URL}/sociallist/${targetUserId}/games`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('Connection error') })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(() => { throw new SystemError('Connection error') })
                    .then(games => {
                        return games.sort((a, b) => b.rating - a.rating)
                    })

            return response.json()
                .catch(() => { throw new SystemError('Connection error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getAllGamesTargetUser