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
