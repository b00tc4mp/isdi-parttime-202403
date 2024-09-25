import errors, { SystemError } from 'com/errors';

import extractPayloadFromJWT from '../utils/extractPayloadFromJWT';

const getUsername = () => {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token);

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: {
            method: 'GET',
            Authorization: `Bearer ${sessionStorage.token}`,
        },
    })
        .catch(() => {
            throw new SystemError('server connection error');
        })
        .then((response) => {
            if (response.status === 200)
                return response
                    .json()

                    .catch(() => {
                        throw new SystemError('server connection error');
                    })
                    .then((user) => user);

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

export default getUsername;

// import errors, { SystemError, CredentialsError } from 'com/errors'
// import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'

// const getUsername = () => {
//     const token = sessionStorage.token

//     if (!token) {
//         throw new CredentialsError('No token found. Please log in.')
//     }

//     try {
//         const { sub: userId } = extractPayloadFromJWT(token)

//         return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//             .then(response => {
//                 if (response.status === 200) {
//                     return response.json()
//                 }

//                 return response.json().then(body => {
//                     const { error, message } = body
//                     const constructor = errors[error] || SystemError
//                     throw new constructor(message)
//                 })
//             })
//             .catch(error => {
//                 if (error instanceof CredentialsError) {
//                     // Handle authentication errors (e.g., redirect to login)
//                     throw new CredentialsError(error.message)
//                 }
//                 throw new SystemError('server error')
//             })
//     } catch (error) {
//         if (error.message === 'invalid jwt') {
//             throw new CredentialsError('Invalid token. Please log in again.')
//         }
//         throw error
//     }
// }

// export default getUsername
