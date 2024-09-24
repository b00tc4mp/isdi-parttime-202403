import errors, { SystemError } from 'com/errors';
import { getUserLocation } from '../utils/getUserLocation';

const searchAds = (searchText, userLocation) => {
    let url = `${import.meta.env.VITE_API_URL}/searchads/${searchText}`;

    if (userLocation && userLocation.lat && userLocation.lng) {
        url += `?lat=${userLocation.lat}&lng=${userLocation.lng}`;
    }

    console.log('I arrived here?', searchText);

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

// import errors, { SystemError } from 'com/errors';
// import { getUserLocation } from '../utils/getUserLocation';

// const searchAds = (searchText, isUserLocationEnabled) => {
//     let url = `${import.meta.env.VITE_API_URL}/searchads/${searchText}`;

//     return new Promise((resolve, reject) => {
//         const fetchAds = (url) => {
//             fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.token}`,
//                 },
//             })
//                 .then((response) => {
//                     if (response.status === 200) {
//                         return response.json();
//                     }
//                     throw new SystemError('server connection problem');
//                 })
//                 .then((ads) => resolve(ads))
//                 .catch((error) => reject(error));
//         };

//         if (isUserLocationEnabled) {
//             getUserLocation()
//                 .then((userLocation) => {
//                     url += `?lat=${userLocation.lat}&lng=${userLocation.lng}`;
//                     fetchAds(url);
//                 })
//                 .catch((error) => {
//                     console.error('Error getting user location:', error);
//                     fetchAds(url); // Fetch ads without location if there's an error
//                 });
//         } else {
//             fetchAds(url);
//         }
//     });
// };

//////////////////

// if (`${userLocation.lat}` !== '0' && `${userLocation.lng}` !== '0') {
//     // getUserLocation();
//     url += `?lat=${userLocation.lat}&lng=${userLocation.lng}`;
// }
