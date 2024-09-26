import errors from 'com/errors'

import validate from 'com/validate'

const getUserInfo = studentId => {
    validate.id(studentId, 'studentId')

    return fetch(`${import.meta.env.VITE_API_URL}/users/${studentId}/info`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(user => user)
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

export default getUserInfo