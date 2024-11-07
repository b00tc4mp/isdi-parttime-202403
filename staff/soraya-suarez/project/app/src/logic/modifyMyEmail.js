import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const modifyMyEmail = (email) => {
    validate.email(email)

    return fetch(`${import.meta.env.VITE_API_URL}/users/modify-my-email`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) 
                return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default modifyMyEmail