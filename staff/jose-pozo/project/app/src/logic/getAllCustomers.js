import errors, { SystemError } from 'com/errors'


const getAllCustomers = () => {

    return fetch(`${import.meta.env.VITE_API_URL}/customers`, {
        method: 'GET',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(customers => customers.sort((a, b) => a.name.localeCompare(b.name)))
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

export default getAllCustomers