import errors, { SystemError } from 'com/errors';

const getAllAds = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/ads`, {

        method: 'GET',

        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`
        }

    })
        .catch(() => { throw new errors.SystemError('server connection problem') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new errors.SystemError('server connection problem') })
                    .then(ads => ads)
            }

            return response.json()
                .catch(() => { throw new errors.SystemError('server connection problem') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getAllAds