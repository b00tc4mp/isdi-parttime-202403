import errors, { SystemError } from 'com/errors'

const getAllGames = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/games`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('Server error') })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(games => games)

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getAllGames