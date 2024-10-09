import { useState } from 'react';

import backArrow from '../../../icons/backArrow.png';

import './SearchBox.css';

function SearchBox({ filterdAds }) {

  const [searchText, setSearchText] = useState('');


  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // const searchText = event.target.search.value;

    filterdAds(searchText);

    // setSearchText('');
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchText('');
    filterdAds('');
  };

  // const handleCancelSearch = (event) => {
  //   event.preventDefault();
  //   window.location.reload();
  // };

  return (
    <form className="SearchBox" onSubmit={handleSearchSubmit}>
      <div className="SearchBoxContainer">

        {searchText && (<img src={backArrow} width={24} alt="Back"  className="ClearButton" onClick={handleClearSearch}/>)}

        <input className="SearchBoxInput" type="text" value={searchText} onChange={handleSearchChange} placeholder="Search Product" />

        <button type="submit" className="SearchBoxButton">Search</button>

        {/* <button onClick={handleCancelSearch}>Cancel</button> */}
      </div>
    </form>
  );
}

export default SearchBox;


// import { useState } from 'react';

// import './SearchBox.css';

// function SearchBox({ filterdAds }) {

 
//   const handleSearchSubmit = (event) => {
   
//     filterdAds(event.target.value);
  
//   };

//   const handleSearchChange = (event) => {
//   };
  
//   return (
//     <section className="SearchBox" >
//       <div className="SearchBoxContainer">

//         <input className="SearchBoxInput" type="text" onChange={handleSearchSubmit} placeholder="Search Product" />

       
//         <button type="submit" className="SearchBoxButton">Search</button>

//       </div>
//     </section>
//   );
// }

// export default SearchBox;


