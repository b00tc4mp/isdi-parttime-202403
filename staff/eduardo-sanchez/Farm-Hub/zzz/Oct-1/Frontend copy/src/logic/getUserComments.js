import errors, { SystemError } from 'com/errors';
import extractPayloadFromJWT from '../utils/extractPayloadFromJWT';

const getUserComments = () => {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token);

    return fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/userComments`,
        {
            method: 'GET',

            headers: {
                Authorization: `Bearer ${sessionStorage.token}`,
            },
        }
    )
        .catch(() => {
            throw new SystemError('server connection problem');
        })
        .then((response) => {
            if (response.status === 200) {
                return response
                    .json()
                    .catch(() => {
                        throw new SystemError('server connection problem');
                    })
                    .then((userComments) => userComments);
            }

            return response
                .json()
                .catch(() => {
                    throw new SystemError('server connection problem');
                })
                .then((body) => {
                    const { error, message } = body;

                    const constructor = errors[error];

                    throw new constructor(message);
                });
        });
};

export default getUserComments;
