import { useState } from 'react';
import backArrow from '../../../icons/backArrow.png';
import './SearchBox.css';

function SearchBox({ searchText, setSearchText, onSearch }) {

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchText);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchText('');
        onSearch('');
    };

    return (
        <form className="SearchBox" onSubmit={handleSearchSubmit}>
            <div className="SearchBoxContainer">
                {searchText && (
                    <img
                        src={backArrow}
                        width={24}
                        alt="Back"
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
                <button type="submit" className="SearchBoxButton">Search</button>
            </div>
        </form>
    );
}

export default SearchBox;

/*
import { useState } from 'react';
import backArrow from '../../../icons/backArrow.png';
import './SearchBox.css';

function SearchBox({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchText);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchText('');
        onSearch('');
    };

    return (
        <form className="SearchBox" onSubmit={handleSearchSubmit}>
            <div className="SearchBoxContainer">
                {searchText && (
                    <img
                        src={backArrow}
                        width={24}
                        alt="Back"
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
                <button type="submit" className="SearchBoxButton">Search</button>
            </div>
        </form>
    );
}

export default SearchBox;
*/