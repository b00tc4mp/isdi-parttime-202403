import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const { ContentError } = errors

const createPost = (title, image, description, callback) => {
    if (typeof title !== 'string' || !title.length)
        throw new ContentError('Title is not valid')

    if (title.length > 50)
        throw new ContentError('Title is too long (It should be less than 50 characters)')

    if (typeof image !== 'string' || !image.startsWith('http'))
        throw new ContentError('Image is not valid')

    if (typeof description !== 'string' || description.length > 250)
        throw new ContentError('Description is not valid')

    validate.callback(callback)

    fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, image, description })
    })
        .then(response => {
            if (response.status === 201) {
                callback(null)

                return
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

export default createPost