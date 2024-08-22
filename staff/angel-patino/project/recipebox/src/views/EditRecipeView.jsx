import EditRecipeForm from "./components/EditRecipeForm"
import View from "../components/library/View"

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
      <FormWithFeedback onSubmit={handleEditRecipeSubmit} message={message}>
        <Field id="title" defaultValue={recipe.title} placeholder="Title">
          Title
        </Field>
        <Field
          id="thumbnail"
          defaultValue={recipe.thumbnail}
          placeholder="Thumbnail URL"
        >
          Thumbnail
        </Field>
        <Field
          id="cookTime"
          type="number"
          defaultValue={recipe.cookTime}
          placeholder="Cook Time (minutes)"
        >
          Cook Time
        </Field>
        <Field
          id="ingredients"
          defaultValue={recipe.ingredients?.join(", ")}
          placeholder="Ingredients (comma separated)"
        >
          Ingredients
        </Field>
        <Field
          id="description"
          defaultValue={recipe.description}
          placeholder="Description"
        >
          Description
        </Field>

        <View direction="row">
          <SubmitButton className="button-primary">Update Recipe</SubmitButton>
          <Button onClick={onCancelEditRecipeClick} className="button-primary">
            Cancel
          </Button>
        </View>
      </FormWithFeedback>
    </View>
  )
}
export default EditeRecipeView
