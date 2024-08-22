import { useState } from "react"
import logic from "../../logic"

import Field from "../../components/core/Field"
import Button from "../../components/core/Button"
import SubmitButton from "../../components/core/SubmitButton"

import FormWithFeedback from "../../components/library/FormWithFeedback"
import View from "../../components/library/View"

function CreateRecipeForm({ onCancelCreateRecipeClick, onRecipeCreated }) {
  const [message, setMessage] = useState("")
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "grams" },
  ])

  const handleCancelCreateRecipeClick = () => onCancelCreateRecipeClick()

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "grams" }])
  }

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index)
    setIngredients(newIngredients)
  }

  const handleIngredientChange = (index, value, field) => {
    const newIngredients = [...ingredients]
    newIngredients[index][field] = value
    setIngredients(newIngredients)
  }

  // const handleQuantityChange = (index, value) => {
  //   const newIngredients = [...ingredients]
  //   newIngredients[index].quantity = value
  //   setIngredients(newIngredients)
  // }

  // const handleUnitChange = (index, value) => {
  //   const newIngredients = [...ingredients]
  //   newIngredients[index].unit = value
  //   setIngredients(newIngredients)
  // }

  const handleCreateRecipeSubmit = (event) => {
    event.preventDefault()
    const form = event.target

    const title = form.title.value
    const thumbnail = form.thumbnail.value
    const cookTime = parseFloat(form.cookTime.value)
    const description = form.description.value

    console.log("Ingredients:", ingredients)
    try {
      logic
        .createRecipe(title, thumbnail, cookTime, ingredients, description)
        .then(() => {
          onRecipeCreated()
          setMessage("Recipe created successfully!")
        })
        .catch((error) => {
          console.error(error)
          setMessage(error.message)
        })
    } catch (error) {
      console.error(error)
      setMessage(error.message)
    }
  }

  return (
    <View className="CreateRecipeForm">
      <FormWithFeedback onSubmit={handleCreateRecipeSubmit} message={message}>
        <Field id="title">Title</Field>
        <Field id="thumbnail">Thumbnail</Field>
        <Field id="cookTime" type="number">
          Cook Time (minutes)
        </Field>
        {ingredients.map((ingredient, index) => (
          <View key={index} className="ingredient-input">
            <Field
              id={`ingredient-${index}`}
              name={`ingredient-${index}`}
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, e.target.value, "name")
              }
            >
              Ingredient
            </Field>
            <Field
              id={`quantity-${index}`}
              name={`quantity-${index}`}
              type="number"
              value={ingredient.quantity}
              onChange={(e) =>
                handleQuantityChange(index, e.target.value, "quantity")
              }
            >
              Quantity
            </Field>
            <select
              value={ingredient.unit}
              onChange={(e) => handleUnitChange(index, e.target.value, "unit")}
            >
              <option value="grams">grams</option>
              <option value="ml">ml</option>
              <option value="l">l</option>
              <option value="tsp">tsp</option>
              <option value="unit">unit</option>
            </select>
            <Button onClick={() => removeIngredient(index)}>Remove</Button>
          </View>
        ))}
        <Button onClick={addIngredient}>Add Ingredient</Button>
        <Field id="description">Description</Field>

        <View direction="row">
          <SubmitButton>Create Recipe</SubmitButton>
          <Button onClick={handleCancelCreateRecipeClick}>Cancel</Button>
        </View>
      </FormWithFeedback>
    </View>
  )
}

export default CreateRecipeForm
