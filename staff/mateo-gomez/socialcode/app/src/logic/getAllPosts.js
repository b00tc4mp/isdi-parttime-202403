import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'


const getAllPosts = callback => {
    validate.callback(callback)


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

    fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        headers: {
            method: 'GET',
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
