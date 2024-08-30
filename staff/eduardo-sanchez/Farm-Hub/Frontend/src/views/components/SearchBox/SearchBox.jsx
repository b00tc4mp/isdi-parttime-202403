import { useEffect, useState } from 'react';
import backArrow from '../../../icons/backArrow.png';

import logic from '../../../logic';

import './SearchBox.css';

function SearchBox({ onSearch, initialSearchText }) {

  const [searchText, setSearchText] = useState(initialSearchText || ''); // state for searching text

  useEffect(() => {
    setSearchText(initialSearchText || '');
  }, [initialSearchText]);

  const handleClearSearch = () => {
    setSearchText('');
    onSearch('');
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchText);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value);
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
        <button type="submit" className="SearchBoxButton">Search</button>
      </div>
    </form>
  );
}

export default SearchBox;