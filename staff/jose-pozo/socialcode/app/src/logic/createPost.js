import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createPost = (title, image, description) => {
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.text(description, 'description', 200)


    fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, image, description })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201) {


                return
            }

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






// const xhr = new XMLHttpRequest

// xhr.onload = () => {
//     if (xhr.status === 201) {
//         callback(null)

//         return
//     }

//     const { error, message } = JSON.parse(xhr.response)

//     const constructor = errors[error]

//     callback(new constructor(message))
// }

// xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)

// xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

// const body = {
//     title,
//     image,
//     description
// }

// const json = JSON.stringify(body)

// xhr.setRequestHeader('Content-Type', 'application/json')
// xhr.send(json)