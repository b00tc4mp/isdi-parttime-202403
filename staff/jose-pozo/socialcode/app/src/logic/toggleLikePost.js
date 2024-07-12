import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'


const tooggleLikePost = (postId) => {
    validate.id(postId, 'postId')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/likes`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('connection error') })
        .then(response => {
            if (response.status === 204) {
                return
            }

            return response.json()
                .catch(() => { throw new SystemError('connection error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default tooggleLikePost





// const xhr = new XMLHttpRequest

// xhr.onload = () => {
//     if (xhr.status === 204) {
//         callback(null)

//         return
//     }

//     const { error, message } = JSON.parse(xhr.response)

//     const constructor = errors[error]

//     callback(new constructor(message))
// }

// xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/Likes`)

// xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
// xhr.send()