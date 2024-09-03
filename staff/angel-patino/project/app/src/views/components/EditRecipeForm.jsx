import { useEffect, useState } from "react"
import logic from "../../logic/index.js"
import updateRecipe from "../../logic/updateRecipe.js"

function EditRecipeForm({
  recipeId,
  onCancelEditRecipeClick,
  onRecipeUpdated,
}) {
  const [recipe, setRecipe] = useState(null)
  const [message, setMessage] = useState("")
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    logic
      .getRecipeById(recipeId)
      .then((recipeToEdit) => {
        if (recipeToEdit) {
          setRecipe(recipeToEdit)
          setIngredients(recipeToEdit.ingredients)
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
      ingredients,
      description: form.description.value,
    }

    updateRecipe(recipeId, updatedRecipe)
      .then(() => {
        onRecipeUpdated()
        setMessage("Recipe updated successfully!")
      })
      .catch((error) => setMessage(error.message))
  }

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index][field] = value
    setIngredients(updatedIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "unit" }])
  }

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index)
    setIngredients(updatedIngredients)
  }

  if (!recipe) {
    return <p>Loading...</p>
  }

  return (
    <form onSubmit={handleEditRecipeSubmit} className="edit-recipe-form">
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          defaultValue={recipe.title}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="thumbnail">Thumbnail URL</label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="url"
          placeholder="Thumbnail URL"
          defaultValue={recipe.thumbnail}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="cookTime">Cook Time (minutes)</label>
        <input
          id="cookTime"
          name="cookTime"
          type="number"
          placeholder="Cook Time (minutes)"
          defaultValue={recipe.cookTime}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          defaultValue={recipe.description}
          required
        ></textarea>
      </div>

      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-input">
          <input
            type="text"
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={(e) =>
              handleIngredientChange(index, "name", e.target.value)
            }
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) =>
              handleIngredientChange(index, "quantity", Number(e.target.value))
            }
            required
          />
          <select
            value={ingredient.unit}
            onChange={(e) =>
              handleIngredientChange(index, "unit", e.target.value)
            }
            required
          >
            <option value="grams">grams</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
            <option value="tsp">tsp</option>
            <option value="unit">unit</option>
          </select>
          <button
            type="button"
            onClick={() => removeIngredient(index)}
            className="remove-ingredient-button"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addIngredient}
        className="add-ingredient-button"
      >
        Add Ingredient
      </button>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          Update Recipe
        </button>
        <button
          type="button"
          onClick={onCancelEditRecipeClick}
          className="cancel-button"
        >
          Cancel
        </button>
      </div>
      {message && <p>{message}</p>}
    </form>
  )
}

export default EditRecipeForm
