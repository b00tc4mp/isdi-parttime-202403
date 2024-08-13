import { useState } from "react"

import logic from "../../logic"

import Field from "../../components/core/Field"
import Button from "../../components/core/Button"
import SubmitButton from "../../components/core/SubmitButton"

import FormWithFeedback from "../../components/library/FormWithFeedback"
import View from "../../components/library/View"

import { SystemError } from "com/errors"

function CreateRecipeForm({ onCancelCreateRecipeClick, onRecipeCreated }) {
  const [message, setMessage] = useState("")

  const handleCancelCreateRecipeClick = () => onCancelCreateRecipeClick()

  const handleCreateRecipeSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const title = form.title.value
    const thumbnail = form.thumbnail.value
    const cookTime = form.cookTime.value
    const ingredients = form.ingredients.value
    const description = form.description.value

    try {
      logic
        .createRecipe(title, thumbnail, cookTime, ingredients, description)
        .then(() => onRecipeCreated())
        .catch((error) => {
          console.error(error)

          if (error instanceof SystemError) {
            alert(error.message)

            return
          }
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
        <Field id="cookTime">Cook Time</Field>
        <Field id="ingredients">Ingredients</Field>
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
