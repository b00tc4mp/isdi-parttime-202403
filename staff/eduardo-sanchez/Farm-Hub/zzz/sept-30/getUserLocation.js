///////////////// Use in your hook
import { useContext } from 'react';
import YourContext from '../YourContext'; // Import your actual context

export const useGetUserLocation = () => {
    const { alert } = useContext(YourContext);

    return () =>
        new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve({ lat: latitude, lng: longitude });
                    },
                    (error) => {
                        alert(`Error getting user location: ${error.message}`);
                        reject(error);
                    }
                );
            } else {
                const errorMessage =
                    'Geolocation is not supported by this browser.';
                alert(errorMessage);
                reject(new Error(errorMessage));
            }
        });
};

export default useGetUserLocation;

///////////////// Use in your component

import { useGetUserLocation } from './path-to-hook';

function YourComponent() {
    const getUserLocation = useGetUserLocation();

    const handleGetLocation = async () => {
        try {
            const location = await getUserLocation();
            console.log('User location:', location);
        } catch (error) {
            console.error('Failed to get location:', error);
        }
    };

    return <button onClick={handleGetLocation}>Get My Location</button>;
}

////////////////////////////////

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
