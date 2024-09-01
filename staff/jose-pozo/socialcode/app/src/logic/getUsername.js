import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getUserName = () => {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('connection error') })
        .then(response => {
            if (response.status === 200) {

                return response.json()
                    .catch(() => { throw new SystemError(error.message) })
                    .then(name => name)
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

export default getUserName







// const xhr = new XMLHttpRequest

// xhr.onload = () => {
//     if (xhr.status === 200) {
//         const name = JSON.parse(xhr.response)

//         callback(null, name)

//         return
//     }

//     const { error, message } = JSON.parse(xhr.response)

//     const constructor = errors[error]

//     callback(new constructor(message))
// }

// xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/${userId}`)

// xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
// xhr.send()