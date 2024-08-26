import { useState } from "react"
import View from "../../components/library/View"
import Recipe from "./Recipe"
import logic from "../../logic"

function SearchFunctionality() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const handleSearch = (event) => {
    event.preventDefault()
    try {
      logic
        .searchRecipes(query)
        .then((recipes) => {
          setResults(recipes)
        })
        .catch((error) => {
          console.error(error)
          alert(error.message)
        })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <View className="search-functionality" tag="section">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <View className="results">
        {results.length > 0 ? (
          results.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)
        ) : (
          <p className="no-results">No results found for "{query}".</p>
        )}
      </View>
    </View>
  )
}

export default SearchFunctionality
