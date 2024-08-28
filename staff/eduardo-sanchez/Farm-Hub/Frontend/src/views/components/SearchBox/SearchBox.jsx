import { useState } from 'react';
import backArrow from '../../../icons/backArrow.png';

import logic from '../../../logic';

import './SearchBox.css';

function SearchBox({ setAds, searchText, setSearchText, setIsLoading }) {

  const handleSearch = (search) => {
    //setIsLoading(true);
    console.log('texto', search)
    try {
      if (search.length > 0) {
        logic
          .searchAds(search)
          .then((searchedAds) => {
            setAds(searchedAds);
            // setSearchText('');
            setIsLoading(false);

          })
          .catch((error) => {
            console.error(error);
            alert(error.message);
            setIsLoading(false);
          });
      } else {
        setAds([]);
        console.log("There are no ads within your search parameters");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  const loadAds = () => {
    setSearchText('');
    //setIsLoading(true);
    console.log('I also got here')
    try {
      logic
        .getAllAds()
        .then((fetchedAds) => {
          console.log(fetchedAds);
          setAds(fetchedAds);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchText);
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
            alt="Back"
            className="ClearButton"
            onClick={loadAds}
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