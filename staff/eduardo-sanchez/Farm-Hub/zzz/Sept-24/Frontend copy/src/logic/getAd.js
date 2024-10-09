import errors, { SystemError } from 'com/errors';

const getAd = (adId) => {
    return fetch(`${import.meta.env.VITE_API_URL}/ad/${adId}`, {

        method: 'GET',

        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`
        }

    })
        .catch(() => { throw new SystemError('server connection problem') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server connection problem') })
                    .then(ad => ad)
            }

            return response.json()
                .catch(() => { throw new SystemError('server connection problem') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default getAd