import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'


const deleteCustomer = (targetUserId) => {

    validate.id(targetUserId, 'targetUserId')

    return fetch(`${import.meta.env.VITE_API_URL}/users/${targetUserId}`, {
        method: 'DELETE',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })

        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 204)
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(targetUserId => targetUserId)

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}