import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'


const createCustomer = (name, surname, email) => {
    // validate.id(userId, 'user id')
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)

    return fetch(`${import.meta.env.VITE_API_URL}/users/customers`, {
        method: 'POST',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,

            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            surname,
            email
        })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201) return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default createCustomer