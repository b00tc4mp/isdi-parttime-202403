export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    reject(error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            reject(new Error('Geolocation not supported'));
        }
    });
};

// export const getUserLocation = () => {
//     console.log('getUserLocation');
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 console.log('position', position);
//                 const { latitude, longitude } = position.coords;
//                 return { lat: latitude, lng: longitude };
//             },
//             (error) => {
//                 console.error('Error getting user location:', error);
//             }
//         );
//     } else {
//         console.error('Geolocation is not supported by this browser.');
//     }
// };
