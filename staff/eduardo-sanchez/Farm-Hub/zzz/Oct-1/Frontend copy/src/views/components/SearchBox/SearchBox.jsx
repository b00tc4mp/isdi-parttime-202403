import { useEffect, useState } from 'react';
import backArrow from '../../../icons/backArrow.png';

import { getUserLocation } from '../../../utils/getUserLocation';

import useContext from '../../../useContext';

import './SearchBox.css';

function SearchBox({ onSearch, initialSearchText, onLocationUpdate }) {
    const [searchText, setSearchText] = useState(initialSearchText || '');

    const { alert } = useContext();

    useEffect(() => {
        setSearchText(initialSearchText || '');
    }, [initialSearchText]);

    useEffect(() => {
        fetchUserLocation();
    }, []);

    const fetchUserLocation = () => {
        try {
            getUserLocation()
                .then((location) => {
                    onLocationUpdate(location);
                })
                .catch((error) => {
                    alert('Error getting user location:', error.message);
                });
        } catch (error) {
            alert(
                'Geolocation may not be enabled or is not supported by your browser:',
                error.message
            );
        }
    };

    const handleClearSearch = () => {
        setSearchText('');
        onSearch('');
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchText);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <form className="SearchBox" onSubmit={handleSearchSubmit}>
            <div className="SearchBoxContainer">
                {searchText && (
                    <img
                        src={backArrow}
                        width={24}
                        alt="Clear Search"
                        className="ClearButton"
                        onClick={handleClearSearch}
                    />
                )}
                <input
                    className="SearchBoxInput"
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Search Product"
                />
                <button type="submit" className="SearchBoxButton">
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBox;
