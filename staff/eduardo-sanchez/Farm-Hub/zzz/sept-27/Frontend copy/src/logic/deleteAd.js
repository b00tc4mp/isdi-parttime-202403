import errors, { SystemError } from 'com/errors';
import validate from 'com/validate';

function deleteAd(adId) {
    validate.id(adId, 'adId');

    return fetch(`${import.meta.env.VITE_API_URL}/ads/${adId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json',
        },
    })
        .catch(() => {
            throw new SystemError('server connection error');
        })
        .then((res) => {
            if (res.status === 204) return;
            console.log(`Ad ${adId} deleted successfully`);

            return res
                .json()
                .catch(() => {
                    throw new SystemError('server connection error');
                })
                .then((body) => {
                    const { error, message } = body;

                    const constructor = errors[error];

                    throw new constructor(message);
                });
        });
}

export default deleteAd;
