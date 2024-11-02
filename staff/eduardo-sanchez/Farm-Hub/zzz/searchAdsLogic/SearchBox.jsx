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

// add some accessibility attributes to the clear button

// <img
//     src={backArrow}
//     width={24}
//     alt="Clear search"
//     className="ClearButton"
//     onClick={handleClearSearch}
//     role="button"
//     tabIndex={0}
//     onKeyPress={(e) => e.key === 'Enter' && handleClearSearch()}
// />