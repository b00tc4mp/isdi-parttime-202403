import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const getUserName = (callback) => {
    validate.callback(callback)

    fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            }
            return response.json().then(({ error, message }) => {
                const constructor = errors[error]
                throw new constructor(message)
            })
        })
        .then((posts) => {
            callback(null, posts)
        })
        .catch((error) => {
            callback(new SystemError(error.message))
        })
}

export default getUserName
