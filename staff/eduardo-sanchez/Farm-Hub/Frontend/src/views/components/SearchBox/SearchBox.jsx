function SearchBox({ filterdAds }) {
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const searchText = event.target.search.value;

    filterdAds(searchText);
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
