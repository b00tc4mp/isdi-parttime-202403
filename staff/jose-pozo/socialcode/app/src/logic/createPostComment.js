import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'



const createPostComment = (postId, comment) => {
    validate.id(postId, 'postId')
    validate.text(comment, 'comment', 200)


    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201)

                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(comment => comment)

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })

        })

}

export default createPostComment




// const xhr = new XMLHttpRequest

// xhr.onload = () => {
//     if (xhr.status === 201) {
//         const comments = JSON.parse(xhr.response)

//         callback(null, comment)

//         return
//     }

//     const { error, message } = JSON.parse(xhr.response)

//     const constructor = errors[error]

//     callback(new constructor(message))
// }

// xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)

// xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

// const body = { comment: comment }

// const json = JSON.stringify(body)

// xhr.setRequestHeader('Content-Type', 'application/json')
// xhr.send(json)

