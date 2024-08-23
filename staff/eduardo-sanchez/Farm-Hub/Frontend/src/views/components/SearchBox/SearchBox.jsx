import logic from "../../../logic";

// import { Link } from 'react-router-dom'

function SearchBox({ setAds }) {
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const search = event.target.search.value;

    try {
      logic
        .searchAds(search)
        .then((ads) => {
          setAds(ads);
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancelSearch = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input type="text" name="search" placeholder="Search for product..." />
      <button>Search</button>

      <button onClick={handleCancelSearch}>Cancel</button>
    </form>
  );
}

export default SearchBox;

// function SearchBox({ setAds, setSearch }) {

// const loadAds = () => {
//     try {
//         logic.getAllAds()
//             .then((ads) => {
//                 console.log(ads)
//                 setAds(ads)
//             })
//             .catch((error) => {
//                 alert(error.message)
//             })
//     } catch (error) {
//         alert(error.message)
//     }
// }

// const handleCancelSearch = (event) => {
//     event.preventDefault()
//     loadAds()
//     setSearch(false)
// }
