import errors, { SystemError } from 'com/errors';


const getAllServices = () => {

    return fetch(`${import.meta.env.VITE_API_URL}/services`, {
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
                    .then(services => services.sort((a, b) => a.name.localeCompare(b.name)))
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

export default getAllServices