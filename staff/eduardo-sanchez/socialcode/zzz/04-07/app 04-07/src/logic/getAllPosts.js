import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const getAllPosts = callback => {
    validate.callback(callback)

    fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .then(response => {
            if (response.status === 200) {

                return response.json()
                    .then(posts => callback(null, posts))
            }

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    callback(new constructor(message))
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default getAllPosts