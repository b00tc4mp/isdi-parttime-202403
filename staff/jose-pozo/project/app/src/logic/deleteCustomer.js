import errors, { SystemError } from 'com/errors'


const deleteCustomer = (targetUserId) => {

    return fetch(`${import.meta.env.VITE_API_URL}/users/${targetUserId}`, {
        method: 'DELETE',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })

        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200)
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