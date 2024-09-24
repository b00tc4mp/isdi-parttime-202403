import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logic from '../logic';
import AdList from './components/AdList/AdList';
import SearchBox from './components/SearchBox/SearchBox';
import { CreateAdButton } from './components/CreateAdButton/CreateAdButton';
import Header from './components/Header/Header';
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

    useEffect(() => {
        console.log('Home -> useEffect');
        fetchUsername();
    }, []);

    useEffect(() => {
        console.log('Search query changed:', q);
        if (q) {
            setCurrentSearchText(q);
        }

        setCurrentSearchText(q || '');
    }, [q, userLocation]);

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const q = searchParams.get('q');
    //     if (q) {
    //         setCurrentSearchText(q);
    //     }
    // }, [location]);

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

    const handleSearch = (text) => {
        if (text) {
            navigate(`/?q=${text}`);
            console.log('searchText', text);
        } else {
            console.log('No hay text value: ', text);
            navigate('/');
        }
    };

    const handleLocationUpdate = (location) => {
        setUserLocation(location);
    };

    return (
        <>
            <Header user={user} />
            <div className="HomeContainer">
                <main className="Home">
                    <SearchBox
                        onSearch={handleSearch}
                        initialSearchText={currentSearchText}
                        onLocationUpdate={handleLocationUpdate}
                    />
                    <AdList
                        searchText={currentSearchText}
                        userLocation={userLocation}
                    />
                </main>
                <CreateAdButton />
            </div>
        </>
    );
}

export default Home;

////////////////////////////////////////

/*
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logic from '../logic';
import AdList from './components/AdList/AdList';
import SearchBox from './components/SearchBox/SearchBox';
import { CreateAdButton } from './components/CreateAdButton/CreateAdButton';
import Header from './components/Header/Header';
import useContext from '../useContext';
import { getUserLocation } from '../utils/getUserLocation';
import './Home.css';

function Home() {
    const [user, setUser] = useState('');
    const [currentSearchText, setCurrentSearchText] = useState('');
    const [userLocation, setUserLocation] = useState(null);

    const { alert } = useContext();
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch username and user location on mount
    useEffect(() => {
        fetchUsername();
        fetchUserLocation();
    }, []);

    // Fetch search text from URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const q = searchParams.get('q');
        if (q) {
            setCurrentSearchText(q);
        }
    }, [location]);

    const fetchUsername = () => {
        logic
            .getUsername()
            .then(setUser)
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    };

    const fetchUserLocation = () => {
        getUserLocation()
            .then((location) => {
                setUserLocation(location);
            })
            .catch((error) => {
                console.error('Error getting user location:', error);
            });
    };

    const handleSearch = (text) => {
        setCurrentSearchText(text);
        if (text) {
            navigate(`/?q=${text}`);
        } else {
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
                    />
                </main>
                <CreateAdButton />
            </div>
        </>
    );
}

export default Home;
*/
