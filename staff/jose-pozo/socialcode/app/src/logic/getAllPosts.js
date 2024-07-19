import errors, { SystemError } from 'com/errors'


const getAllPosts = () => {
    validate.callback(callback)
    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200)

                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(posts => posts)


            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getAllPosts





const xhr = new XMLHttpRequest

// xhr.onload = () => {
//     if (xhr.status === 200) {
//         const posts = JSON.parse(xhr.response)

//         callback(null, posts)

//         return
//     }

//     const { error, message } = JSON.parse(xhr.response)

//     const constructor = errors[error]

//     callback(new constructor(message))
// }

// xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts`)

// xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

// xhr.send()