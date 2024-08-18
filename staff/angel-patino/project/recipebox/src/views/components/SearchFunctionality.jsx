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
    <View className="SearchFunctionality" tag="section">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="p-2 border border-gray-400 rounded-md"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </form>

      <View className="results mt-4">
        {results.length > 0 ? (
          results.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)
        ) : (
          <p>No results found for "{query}".</p>
        )}
      </View>
    </View>
  )
}

export default SearchFunctionality
