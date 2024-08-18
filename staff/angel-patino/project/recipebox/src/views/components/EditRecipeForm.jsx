import { useEffect, useState } from "react"
import logic from "../../logic/index.js"
import Field from "../../components/core/Field.jsx"
import Button from "../../components/core/Button.jsx"
import SubmitButton from "../../components/core/SubmitButton.jsx"
import FormWithFeedback from "../../components/library/FormWithFeedback.jsx"
import View from "../../components/library/View.jsx"

function EditRecipeForm({
  recipeId,
  onCancelEditRecipeClick,
  onRecipeUpdated,
}) {
  const [recipe, setRecipe] = useState({})
  const [message, setMessage] = useState("")

  useEffect(() => {
    logic
      .getRecipeById(recipeId)
      .then(setRecipe.catch((error) => setMessage(error.message)))
  }, [recipeId])

  const handleEditRecipeSubmit = (event) => {
    event.preventDefault()
    const form = event.target

    const updates = {
      title: form.title.value,
      thumbnail: form.thumbnail.value,
      cookTime: parseFloat(form.cookTime.value),
      ingredients: form.ingredients.value,
      description: form.description.value,
    }

    logic
      .editRecipe(recipeId, updates)
      .then(() => onRecipeUpdated())
      .catch((error) => setMessage(error.message))
  }

  return (
    <View className="EditRecipeForm">
      <FormWithFeedback onSubmit={handleEditRecipeSubmit} message={message}>
        <Field id="Title" defaultValue={recipe.title}>
          Title
        </Field>
        <Field id="thumbnail" defaultValue={recipe.thumbnail}>
          Thumbnail
        </Field>
        <Field id="cookTime" defaultValue={recipe.cookTime}>
          Cook Time
        </Field>
        <Field id="ingredients" defaultValue={recipe.ingredients}>
          Ingredients
        </Field>
        <Field id="description" defaultValue={recipe.description}>
          Description
        </Field>

        <View direction="row">
          <SubmitButton>Update Recipe</SubmitButton>
          <Button onClick={onCancelEditRecipeClick}>Cancel</Button>
        </View>
      </FormWithFeedback>
    </View>
  )
}
export default EditRecipeForm
