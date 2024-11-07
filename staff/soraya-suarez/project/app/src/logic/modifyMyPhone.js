import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const modifyMyPhone = (phone) => {
    validate.phone(phone)

    return fetch(`${import.meta.env.VITE_API_URL}/users/modify-my-phone`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone })
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

export default modifyMyPhone