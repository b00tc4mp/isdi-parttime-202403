import errors, { SystemError } from 'com/errors';
import validate from 'com/validate';

const updateAd = (adId, title, description, price, contactInfo) => {
    validate.id(adId, 'adId');
    validate.text(title, 'title');
    validate.text(description, 'description');
    validate.price(price, 'price');
    validate.contactInfo(contactInfo, 'contactInfo');

    return fetch(`${import.meta.env.VITE_API_URL}/updatead/${adId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ title, description, price, contactInfo }),
    })
        .catch(() => {
            throw new SystemError('server connection error');
        })
        .then((response) => {
            if (response.status === 200) return;

            return response
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
};
export default updateAd;
