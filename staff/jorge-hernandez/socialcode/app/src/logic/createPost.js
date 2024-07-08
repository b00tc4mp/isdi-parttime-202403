import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createPost = (title, image, description, callback) => {
    validate.text(title)
    validate.url(image)
    validate.text(description)
    validate.callback(callback)

    fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`,
        },
        body: JSON.stringify({ title, image, description }),
    })
        .then((response) => {
            if (response.status === 201) {
                callback(null)

                return
            }
            return response.json().then(({ error, message }) => {
                const constructor = errors[error]
                callback(new constructor(message))
            })
        })
        .catch((error) => callback(new SystemError(error.message)))
}

export default createPost
