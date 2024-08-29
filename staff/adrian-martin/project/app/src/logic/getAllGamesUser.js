import errors, { SystemError } from 'com/errors'

const getAllGamesUser = (userId) => {
    return fetch(`${import.meta.env.VITE_API_URL}/games/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('Server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(games => {
                        return games.sort((a, b) => b.rating - a.rating)
                    })
            }
            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getAllGamesUser