import { useEffect, useState } from 'react';
import backArrow from '../../../icons/backArrow.png';

import { getUserLocation } from '../../../utils/getUserLocation';

import './SearchBox.css';

function SearchBox({ onSearch, initialSearchText, onLocationUpdate }) {
    const [searchText, setSearchText] = useState(initialSearchText || '');

    useEffect(() => {
        setSearchText(initialSearchText || '');
    }, [initialSearchText]);

    useEffect(() => {
        fetchUserLocation();
    }, []);

    const fetchUserLocation = () => {
        getUserLocation()
            .then((location) => {
                onLocationUpdate(location);
            })
            .catch((error) => {
                console.error('Error getting user location:', error);
            });
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
