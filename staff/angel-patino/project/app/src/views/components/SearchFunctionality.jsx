import { useState } from "react"
import View from "../../components/library/View"
import Recipe from "./Recipe"
import logic from "../../logic"

function SearchFunctionality() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [message, setMessage] = useState("") // New state to manage error messages

  const handleSearch = (event) => {
    event.preventDefault()
    try {
      logic
        .searchRecipes(query)
        .then((recipes) => {
          if (recipes.length === 0) {
            setMessage(`No results found for "${query}".`)
          } else {
            setResults(recipes)
            setMessage("") // Clear the message if results are found
          }
        })
        .catch((error) => {
          console.error(error)
          setMessage(error.message) // Display error message
        })
    } catch (error) {
      console.error(error)
      setMessage(error.message) // Display error message
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
          <p className="no-results">{message}</p>
        )}
      </View>
    </View>
  )
}

export default SearchFunctionality
