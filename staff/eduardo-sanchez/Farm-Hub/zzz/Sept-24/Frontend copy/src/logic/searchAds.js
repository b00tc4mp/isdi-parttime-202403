import errors, { SystemError } from 'com/errors';

const searchAds = (searchText, userLocation) => {
    let url = `${import.meta.env.VITE_API_URL}/searchads/${searchText}`;

    if (userLocation && userLocation.lat && userLocation.lng) {
        url += `?lat=${userLocation.lat}&lng=${userLocation.lng}`;
    }

    console.log('Llego aqui?');

    return fetch(url, {
        method: 'GET',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
        },
    })
        .catch(() => {
            throw new SystemError('server connection problem');
        })
        .then((response) => {
            if (response.status === 200) {
                console.log('Llego aqui?');
                return response
                    .json()
                    .catch(() => {
                        throw new SystemError('server connection problem');
                    })
                    .then((ads) => ads);
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

export default searchAds;
