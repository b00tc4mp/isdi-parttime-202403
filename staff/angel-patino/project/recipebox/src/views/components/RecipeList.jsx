import { useState, useEffect } from "react"
import View from "../../components/library/View"
import Recipe from "./Recipe"
import EditRecipeForm from "./EditRecipeForm"
import logic from "../../logic"

function RecipeList({ refreshStamp, showFavorites = false, searchQuery = "" }) {
  const [recipes, setRecipes] = useState([])
  const [editingRecipeId, setEditingRecipeId] = useState(null)

  useEffect(() => {
    loadRecipes()
  }, [refreshStamp, showFavorites, searchQuery])

  const loadRecipes = () => {
    try {
      logic
        .getAllRecipes()
        .then((recipes) => {
          let filteredRecipes = recipes

          if (showFavorites) {
            filteredRecipes = filteredRecipes.filter((recipe) =>
              recipe.likes.includes(logic.getUserId())
            )
          }

          if (searchQuery) {
            filteredRecipes = filteredRecipes.filter((recipe) =>
              recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
          }

          setRecipes(filteredRecipes)
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

  const handleRecipeDeleted = () => loadRecipes()

  const handleRecipeLikeToggled = () => loadRecipes()

  const handleEditRecipeClick = (recipeId) => {
    const recipe = recipes.find((r) => r.id === recipeId)
    if (recipe.author.id === logic.getUserId()) {
      setEditingRecipeId(recipeId)
    } else {
      alert("You can only edit your own recipes.")
    }
  }

  const handleCancelEditRecipeClick = () => setEditingRecipeId(null)

  const handleRecipeUpdated = () => {
    loadRecipes()
    setEditingRecipeId(null)
  }

  return (
    <View tag="section" className="RecipeList">
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          {editingRecipeId === recipe.id ? (
            <EditRecipeForm
              recipeId={recipe.id}
              onCancelEditRecipeClick={handleCancelEditRecipeClick}
              onRecipeUpdated={handleRecipeUpdated}
            />
          ) : (
            <Recipe
              recipe={recipe}
              onRecipeDeleted={handleRecipeDeleted}
              onRecipeLikeToggled={handleRecipeLikeToggled}
              onEditRecipeClick={() => handleEditRecipeClick(recipe.id)}
            />
          )}
        </div>
      ))}
    </View>
  )
}

export default RecipeList
