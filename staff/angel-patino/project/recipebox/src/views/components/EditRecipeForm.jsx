import { useEffect, useState } from "react"
import logic from "../../logic/index.js"
import Field from "../../components/core/Field.jsx"
import Button from "../../components/core/Button.jsx"
import SubmitButton from "../../components/core/SubmitButton.jsx"
import FormWithFeedback from "../../components/library/FormWithFeedback.jsx"
import View from "../../components/library/View.jsx"
import Text from "../../components/core/Text.jsx"

function EditRecipeForm({
  recipeId,
  onCancelEditRecipeClick,
  onRecipeUpdated,
}) {
  const [recipe, setRecipe] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    logic
      .getAllRecipes()
      .then((recipes) => {
        const recipeToEdit = recipes.find((recipe) => recipe.id === recipeId)
        if (recipeToEdit) {
          setRecipe(recipeToEdit)
        } else {
          setMessage("Recipe not found.")
        }
      })
      .catch((error) => setMessage(error.message))
  }, [recipeId])

  const handleEditRecipeSubmit = (event) => {
    event.preventDefault()
    const form = event.target

    const updatedRecipe = {
      title: form.title.value,
      thumbnail: form.thumbnail.value,
      cookTime: parseFloat(form.cookTime.value),
      ingredients: recipe.ingredients, // Assuming ingredients are handled separately
      description: form.description.value,
    }

    logic
      .updatedRecipe(recipeId, updatedRecipe)
      .then(() => {
        onRecipeUpdated()
        setMessage("Recipe updated successfully!")
      })
      .catch((error) => setMessage(error.message))
  }

  const handleInputChange = (field, value) => {
    setRecipe({ ...recipe, [field]: value })
  }

  if (!recipe) {
    return <p>Loading...</p>
  }

  return (
    <View className="edit-recipe-form">
      <FormWithFeedback onSubmit={handleEditRecipeSubmit} message={message}>
        <Field
          id="title"
          defaultValue={recipe.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        >
          Title
        </Field>
        <Field
          id="thumbnail"
          defaultValue={recipe.thumbnail}
          onChange={(e) => handleInputChange("thumbnail", e.target.value)}
        >
          Thumbnail
        </Field>
        <Field
          id="cookTime"
          defaultValue={recipe.cookTime}
          onChange={(e) => handleInputChange("cookTime", e.target.value)}
        >
          Cook Time
        </Field>
        <View className="ingredients-section">
          <Text className="ingredients-title">Ingredients:</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} className="ingredient-input">
              <Field
                id={`ingredient-${index}`}
                name={`ingredient-${index}`}
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                className="form-field"
              />
              <Field
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                type="number"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                className="form-field"
              />
              <select
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                className="form-select"
              >
                <option value="grams">grams</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="tsp">tsp</option>
                <option value="unit">unit</option>
              </select>
              <Button
                onClick={() => removeIngredient(index)}
                className="remove-ingredient-button"
              >
                Remove
              </Button>
            </View>
          ))}
          <Button
            onClick={() => addIngredient()}
            className="add-ingredient-button"
          >
            Add Ingredient
          </Button>
        </View>
        <View className="form-actions">
          <SubmitButton className="submit-button">Update Recipe</SubmitButton>
          <Button onClick={onCancelEditRecipeClick} className="cancel-button">
            Cancel
          </Button>
        </View>
      </FormWithFeedback>
    </View>
  )
}

export default EditRecipeForm
