import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const editUsername = (userId, username) => {
    try {
        validate.username(username)
        validate.id(userId, 'userId')
    } catch (error) {
        return Promise.reject(error) // Esto propagará el error como una promesa rechazada
    }

    return fetch(`${import.meta.env.VITE_API_URL}/profile/${userId}/editUsername`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
        .then(response => {
            if (response.status === 200) return
            return response.json().then(body => {
                throw new SystemError(body.error || 'Unknown error')
            })
        })
        .catch(error => { throw new SystemError(error.message) })
}

export default editUsername