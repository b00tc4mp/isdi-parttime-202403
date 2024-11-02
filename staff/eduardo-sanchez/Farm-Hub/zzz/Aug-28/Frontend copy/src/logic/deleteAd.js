import errors, { SystemError } from 'com/errors';
import validate from 'com/validate';

function deleteAd(adId) {
    validate.id(adId, 'adId')

    return fetch(`${import.meta.env.VITE_API_URL}/ads/${adId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json',

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

                    throw new constructor(message)

                })
        })

}

export default deleteAd

/*
const deleteAd = (adId) => {
    validate.id(adId, 'adId')

    return fetch(`${import.meta.env.VITE_API_URL}/ads/${adId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { 
            throw new SystemError('server connection error') 
        })
        .then(res => {
            if (res.status === 204) {
                // If the delete was successful, simply return and don't proceed to further processing
                console.log(`Ad ${adId} deleted successfully`);
                return;  // Exit early to avoid unnecessary error handling
            }

            // This part of the code is only reached if res.status is not 204
            return res.json()
                .catch(() => { throw new SystemError('server connection error') })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}
*/