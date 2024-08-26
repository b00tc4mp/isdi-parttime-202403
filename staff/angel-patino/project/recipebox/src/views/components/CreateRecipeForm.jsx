import { useState } from "react"
import logic from "../../logic"

function CreateRecipeForm({ onCancelCreateRecipeClick, onRecipeCreated }) {
  const [message, setMessage] = useState("")
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: 0, unit: "grams" },
  ])

  const handleCancelCreateRecipeClick = () => onCancelCreateRecipeClick()

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "grams" }])
  }

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index][field] =
      field === "quantity" ? parseFloat(value) : value
    setIngredients(newIngredients)
  }

  const handleCreateRecipeSubmit = (event) => {
    event.preventDefault()
    const { title, thumbnail, cookTime, description } = event.target

    try {
      logic
        .createRecipe(
          title.value,
          thumbnail.value,
          parseFloat(cookTime.value),
          ingredients,
          description.value
        )
        .then(() => {
          onRecipeCreated()
          setMessage("Recipe created successfully!")
        })
        .catch((error) => setMessage(error.message))
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <form onSubmit={handleCreateRecipeSubmit} className="create-recipe-form">
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
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
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
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
              handleIngredientChange(index, "quantity", e.target.value)
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
          Create Recipe
        </button>
        <button
          type="button"
          onClick={handleCancelCreateRecipeClick}
          className="cancel-button"
        >
          Cancel
        </button>
      </div>
      {message && <p>{message}</p>}
    </form>
  )
}

export default CreateRecipeForm
