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
    const [currentSearchText, setCurrentSearchText] = useState('');
    const [userLocation, setUserLocation] = useState(null);

    const { alert } = useContext();
    const navigate = useNavigate();
    const { search } = useLocation();

    const searchParams = new URLSearchParams(search);
    const q = searchParams.get('q');

    useEffect(() => {
        fetchUsername();
    }, []);

    useEffect(() => {
        setCurrentSearchText(q || '');
    }, [search]);

    const fetchUsername = () => {
        try {
            logic
                .getUsername()
                .then((user) => {
                    setUser(user);
                })
                .catch((error) => {
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSearch = (text) => {
        if (text) {
            navigate(`/?q=${text}`);
        } else {
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
