import errors, { SystemError } from 'com/errors';
import validate from 'com/validate';

const createAdComment = (adId, comment) => {
    validate.id(adId);
    validate.text(comment, 'comments', 150);

    return fetch(`${import.meta.env.VITE_API_URL}/ads/${adId}/comments`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ adId, text: comment }),
    })
        .catch(() => {
            throw new SystemError('server connection error');
        })
        .then((response) => {
            if (response.status === 201) {
                return;
            }

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

export default createAdComment;
