import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const editUsername = (userId, username) => {
    validate.id(userId, 'userId')
    validate.username(username)

    return fetch(`${import.meta.env.VITE_API_URL}/profile/${userId}/editUsername`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
        .catch(error => { throw new SystemError((error.message)) })
        .then(response => {
            if (response === 200) return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    console.log(body)
                })
        })
}

export default editUsername