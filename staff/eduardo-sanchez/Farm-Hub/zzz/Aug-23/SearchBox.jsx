import logic from '../../../logic';

function SearchBox({ onSearch }) {

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const search = event.target.search.value;

        onSearch(search);
    };

    const handleCancelSearch = (event) => {
        event.preventDefault();
        onSearch(''); // Clear search input, or you can add custom logic to reset the state
    };

    return (
        <form onSubmit={handleSearchSubmit}>
            <input type="text" name="search" placeholder="Search for product..." />
            <button type="submit">Search</button>
            <button onClick={handleCancelSearch}>Cancel</button>
        </form>
    );
}

export default SearchBox;
