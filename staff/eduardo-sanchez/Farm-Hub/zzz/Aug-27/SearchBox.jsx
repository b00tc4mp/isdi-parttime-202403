import { useState } from 'react';

import './SearchBox.css';


function SearchBox({ searchText, setSearchText, onSearch }) {

    // const [searchText, setSearchText] = useState('');

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

                <input className="SearchBoxInput" type="text" value={searchText} onChange={handleSearchChange} placeholder="Search Product" />


                <button type="submit" className="SearchBoxButton">Search</button>

            </div>
        </form>
    );
}

export default SearchBox;
