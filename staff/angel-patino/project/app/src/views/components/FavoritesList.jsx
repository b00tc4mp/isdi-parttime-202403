import { useEffect, useState } from "react"
import Recipe from "./Recipe"
import View from "../../components/library/View"
import logic from "../../logic"

function FavoritesList() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = () => {
    try {
      logic
        .getAllRecipes()
        .then((recipes) => {
          const userId = logic.getUserId()
          const favoriteRecipes = recipes.filter((recipe) =>
            recipe.likes.includes(userId)
          )
          setFavorites(favoriteRecipes)
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
    <View className="favorites-list" tag="section">
      {favorites.length > 0 ? (
        favorites.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)
      ) : (
        <p className="no-favorites">No favorites yet!</p>
      )}
    </View>
  )
}

export default FavoritesList
