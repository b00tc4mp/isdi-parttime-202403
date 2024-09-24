import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logic from '../logic';
import AdList from './components/AdList/AdList';
import SearchBox from './components/SearchBox/SearchBox';
import { CreateAdButton } from './components/CreateAdButton/CreateAdButton';
import Header from './components/Header/Header';
import { getUserLocation } from '../utils/getUserLocation';
import useContext from '../useContext';

import './Home.css';

function Home() {
    const [user, setUser] = useState('');

    const [currentSearchText, setCurrentSearchText] = useState(null);

    const [userLocation, setUserLocation] = useState(null);

    const { alert } = useContext();

    const navigate = useNavigate();

    const { search } = useLocation();

    const searchParams = new URLSearchParams(search);

    const q = searchParams.get('q');

    //const lat = searchParams.get('lat');
    //const lng = searchParams.get('lng');

    useEffect(() => {
        console.log('Home -> useEffect');
        fetchUsername();
        fetchUserLocation();
    }, []);

    useEffect(() => {
        console.log('Search query changed:', q);
        // setCurrentSearchText(q);
        setCurrentSearchText(q || '');
        // if (q) {
        //     handleSearch(q);
        // }
    }, [q]);

    const fetchUsername = () => {
        try {
            logic
                .getUsername()
                .then((user) => {
                    console.log('Home -> setUsername');
                    setUser(user);
                })
                .catch((error) => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const fetchUserLocation = () => {
        getUserLocation()
            .then((location) => {
                console.log('Home -> setUserLocation');
                setUserLocation(location);
            })
            .catch((error) => {
                console.error('Error getting user location:', error);
            });
    };

    const handleSearch = (text) => {
        if (text) {
            // const searchParams = new URLSearchParams({
            //    q: text,
            //    lat: userLocation.lat,
            //    lng: userLocation.lng,
            // }).toString();

            navigate(`/?q=${text}`);
            console.log('searchText', text);
            // setCurrentSearchText(searchText);
            // console.log('Búsqueda realizada:', searchText, userLocation);

            // console.log('entra en el searched text');
        } else {
            console.log('No hay text value: ', text);
            // setCurrentSearchText('');

            navigate('/');
        }
    };

    return (
        <>
            <Header user={user} />
            <div className="HomeContainer">
                <main className="Home">
                    <SearchBox
                        onSearch={handleSearch}
                        initialSearchText={currentSearchText}
                    />
                    <AdList
                        searchText={currentSearchText}
                        userLocation={userLocation}
                        // userLocation={{
                        //     lat: parseFloat(lat),
                        //     lng: parseFloat(lng),
                        // }}
                    />
                </main>
                <CreateAdButton />
            </div>
        </>
    );
}

export default Home;
