import EditRecipeForm from "./components/EditRecipeForm"
import View from "../components/library/View"

function EditeRecipeView({
  recipeId,
  onRecipeUpdated,
  onCancelEditRecipeClick,
}) {
  return (
    <View>
      <Title>Edit Your Recipe</Title>
      <EditRecipeForm
        recipeId={recipeId}
        onRecipeUpdated={onRecipeUpdated}
        onCancelEditRecipeClick={onCancelEditRecipeClick}
      />
    </View>
  )
}
export default EditeRecipeView
