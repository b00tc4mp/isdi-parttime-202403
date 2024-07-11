import errors, { SystemError } from 'com/errors'

const { ContentError } = errors

const createPost = (title, image, description) => {
    if (typeof title !== 'string' || !title.length)
        throw new ContentError('Title is not valid')

    if (title.length > 50)
        throw new ContentError('Title is too long (It should be less than 50 characters)')

    if (typeof image !== 'string' || !image.startsWith('http'))
        throw new ContentError('Image is not valid')

    if (typeof description !== 'string' || description.length > 250)
        throw new ContentError('Description is not valid')


    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, image, description })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201)
                return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default createPost