import errors from "com/errors.js"
import validate from "com/validate.js"

const toggleLike = (postId) => {
    validate.id(postId)



    /*
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
        if (xhr.status === 200) {
            callback(null)
            return
        }

        const { error, message } = JSON.parse(xhr.response)
        const constructor = errors[error]
        callback(new constructor(message))
    }
    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/likes`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send()

    */

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/likes`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        },
    })
        .catch(error => { throw new SystemError(error) })
        .then(response => {
            if (response.status === 204) {


                return
            }

            return response.json()
                .catch(error => { throw new SystemError(error) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })

}

export default toggleLike