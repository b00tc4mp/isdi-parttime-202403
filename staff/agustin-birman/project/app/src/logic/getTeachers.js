import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'
import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

const getTeachers = () => {

    const { sub: userId } = extractPayloadFromJWT(localStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/teachers`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(students => students)
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

export default getTeachers