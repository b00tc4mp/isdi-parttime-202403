import { useState } from 'react';

import './SearchBox.css';

function SearchBox({ filterdAds }) {

  const [searchText, setSearchText] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // const searchText = event.target.search.value;

    filterdAds(searchText);

    setSearchText('');
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // const handleClearSearch = () => {
  //   setSearchText('');
  //   filterdAds('');
  // };

  // const handleCancelSearch = (event) => {
  //   event.preventDefault();
  //   window.location.reload();
  // };

  return (
    <form className="SearchBox" onSubmit={handleSearchSubmit}>
      <div className="SearchBoxContainer">

        <input className="SearchBoxInput" type="text" value={searchText} onChange={handleSearchChange} placeholder="Search Product" />

        {/* {searchText && (<button type='button' className="ClearButton" onClick={handleClearSearch}>Clear</button>)} */}

        <button type="submit" className="SearchBoxButton">Search</button>

        {/* <button onClick={handleCancelSearch}>Cancel</button> */}
      </div>
    </form>
  );
}

export default SearchBox;
