import errors, { SystemError } from 'com/errors'


const getAllPosts = () => {


    /*
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const posts = JSON.parse(xhr.response)

            callback(null, posts)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

    xhr.send()
    */

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        headers: {
            method: 'GET',
            Authorization: `Bearer ${sessionStorage.token}`

        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200) {

                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(posts => { return posts })

            }

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })

        })
}


export default getAllPosts
