import { SystemError } from 'com/errors';

export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ lat: latitude, lng: longitude });
                },
                () => {
                    reject(new SystemError('Error getting user location'));
                }
            );
        } else {
            reject(
                new SystemError('Geolocation not supported by this browser')
            );
        }
    });
};

// import errors, { SystemError } from 'com/errors';

// const getUserLocation = () => {
//     return new Promise((resolve, reject) => {
//         if (!navigator.geolocation) {
//             reject(
//                 new SystemError('Geolocation is not supported by this browser.')
//             );
//             return;
//         }

//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 resolve({ lat: latitude, lng: longitude });
//             },
//             () => {
//                 reject(new SystemError('Failed to get user location'));
//             }
//         );
//     })
//         .catch(() => {
//             throw new SystemError('Failed to get location from browser');
//         })
//         .then((location) => location);
// };
// export default getUserLocation;
