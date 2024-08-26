import React from "react"
import View from "../../components/library/View"
import Recipe from "./Recipe"
import { useMyRecipes } from "../../hooks/useMyRecipes"

function MyRecipesView() {
  const myRecipes = useMyRecipes()

  return (
    <View className="my-recipes-view" tag="section">
      {myRecipes.length > 0 ? (
        myRecipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)
      ) : (
        <p className="no-recipes">You haven`t created any recipes yet!</p>
      )}
    </View>
  )
}

export default MyRecipesView
