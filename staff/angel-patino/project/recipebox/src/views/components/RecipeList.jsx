import { useState, useEffect } from "react"

import View from "../../components/library/View"
import Recipe from "./Recipe"

import logic from "../../logic"

function RecipeList({ refreshStamp }) {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    loadRecipes()
  }, [refreshStamp])

  const loadRecipes = () => {
    try {
      logic
        .getAllRecipes()
        .then((recipes) => {
          setRecipes(recipes)
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

  return (
    <View tag="section" className="RecipeList">
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          recipe={recipe}
          onRecipeDeleted={handleRecipeDeleted}
          onRecipeLikeToggled={handleRecipeLikeToggled}
        />
      ))}
    </View>
  )
}

export default RecipeList
