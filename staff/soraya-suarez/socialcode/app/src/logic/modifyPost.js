import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const modifyPost = (postId, title, image, description) => {
    validate.id(postId, 'postId')
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, image, description })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 204) 
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

export default modifyPost