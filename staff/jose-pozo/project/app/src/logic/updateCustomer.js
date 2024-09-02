import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'


const updateCustomer = (customerId, customerUpdated) => {
    validate.id(customerId, 'customerId')

    if (customerUpdated.name) validate.name(customerUpdated.name)
    if (customerUpdated.surname) validate.name(customerUpdated.surname, 'surname')
    if (customerUpdated.email) validate.email(customerUpdated.email)
    if (customerUpdated.phone) validate.phone(customerUpdated.phone)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${customerId}`, {
        method: 'PATCH',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,

            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerUpdated })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}


export default updateCustomer