import errors, { SystemError } from 'com/errors';
import validate from 'com/validate';

const deleteAd = (adId) => {
    validate.id(adId, 'adId')

    return fetch(`${import.meta.env.VITE_API_URL}/ads/${adId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server connection error') })
        .then(res => {
            if (res.status === 204) return

            return res.json()
                .catch(() => { throw new SystemError('server conection error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    console.log(`Ad ${adId} deleted`)
                    throw new constructor(message)

                })
        })


}

export default deleteAd