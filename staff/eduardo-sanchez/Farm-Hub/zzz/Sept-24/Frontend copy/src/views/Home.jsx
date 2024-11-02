import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logic from '../logic';
import AdList from './components/AdList/AdList';
import SearchBox from './components/SearchBox/SearchBox';
import { CreateAdButton } from './components/CreateAdButton/CreateAdButton';
import Header from './components/Header/Header';
import './Home.css';

import useContext from '../useContext';

function Home() {
    const [user, setUser] = useState('');

    const [currentSearchText, setCurrentSearchText] = useState(null);

    const { alert } = useContext();

    const navigate = useNavigate();

    const { search } = useLocation();

    const searchParams = new URLSearchParams(search);

    const q = searchParams.get('q');

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    useEffect(() => {
        console.log('Home -> useEffect');
        fetchUsername();
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

    const handleSearch = (searchText, userLocation) => {
        if (searchText) {
            const searchParams = new URLSearchParams({
                q: searchText,
                lat: userLocation.lat,
                lng: userLocation.lng,
            }).toString();

            navigate(`/?q=${searchParams}`);

            console.log('Búsqueda realizada:', searchText, userLocation);

            // console.log('entra en el searched text');
        } else {
            navigate('/');

            console.log('no hay text searched');
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

                    {currentSearchText !== null && (
                        <AdList
                            searchText={currentSearchText}
                            userLocation={{
                                lat: parseFloat(lat),
                                lng: parseFloat(lng),
                            }}
                        />
                    )}
                </main>
                <CreateAdButton />
            </div>
        </>
    );
}

export default Home;
