export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ lat: latitude, lng: longitude });
                },
                (error) => {
                    alert('Error getting user location:' + error.message);
                    reject(error);
                }
            );
        } else {
            alert(
                'Geolocation is not supported by this browser. ${error.message}'
            );
            reject(new Error('Geolocation not supported'));
        }
    });
};

// import { useContext } from 'react';
// import YourContext from '../YourContext'; // Import your actual context

// export const useGetUserLocation = () => {
//     const { alert } = useContext(YourContext);

//     return () =>
//         new Promise((resolve, reject) => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         const { latitude, longitude } = position.coords;
//                         resolve({ lat: latitude, lng: longitude });
//                     },
//                     (error) => {
//                         alert(`Error getting user location: ${error.message}`);
//                         reject(error);
//                     }
//                 );
//             } else {
//                 const errorMessage =
//                     'Geolocation is not supported by this browser.';
//                 alert(errorMessage);
//                 reject(new Error(errorMessage));
//             }
//         });
// };

// import { useGetUserLocation } from './path-to-hook';

// function YourComponent() {
//     const getUserLocation = useGetUserLocation();

//     const handleGetLocation = async () => {
//         try {
//             const location = await getUserLocation();
//             console.log('User location:', location);
//         } catch (error) {
//             console.error('Failed to get location:', error);
//         }
//     };

//     return <button onClick={handleGetLocation}>Get My Location</button>;
// }
