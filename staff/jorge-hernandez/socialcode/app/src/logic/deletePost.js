import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const deletePost = (postId, callback) => {
    validate.id(postId, 'postId')
    validate.callback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 204) {
            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

    xhr.send()

    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`
        },
    })
        .then(response => {
            if (response.status === 204) {
                callback(null);

                return
            }
            return response.json()
                .then(({ error, message }) => {
                    const constructor = errors[error]
                    callback(new constructor(message))
                });

        })
        .catch(error => callback(new SystemError(error.message)));
};

export default deletePost