import React from "react"
import EditRecipeForm from "./EditRecipeForm"
import View from "../../components/library/View"

function EditeRecipeView({
  recipeId,
  onRecipeUpdated,
  onCancelEditRecipeClick,
}) {
  return (
    <View tag="main" className="edit-recipe-view">
      <Heading level="2" className="form-title">
        Edit Recipe
      </Heading>
      <EditRecipeForm
        recipeId={recipeId}
        onRecipeUpdated={onRecipeUpdated}
        onCancelEditRecipeClick={onCancelEditRecipeClick}
      />
    </View>
  )
}

export default EditeRecipeView
