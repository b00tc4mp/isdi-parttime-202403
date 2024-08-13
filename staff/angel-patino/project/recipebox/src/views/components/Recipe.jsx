import Thumbnail from "../../components/core/Thumbnail"
import Heading from "../../components/core/Heading"
import Button from "../../components/core/Button"
import Text from "../../components/core/Text"
import Time from "../../components/core/Time"

import View from "../../components/library/View"

import logic from "../../logic"

import { useState } from "react"

function Recipe({ recipe, onRecipeDeleted, onRecipeLikeToggled }) {
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)

  const handleDeleteRecipe = () => setConfirmDeleteVisible(true)

  const handleToggleLikeRecipe = () => {
    try {
      logic
        .toggleLikeRecipe(recipe.id)
        .then(() => onRecipeLikeToggled())
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleDeleteRecipeAcceptd = () => {
    try {
      logic
        .deleteRecipe(recipe.id)
        .then(() => onRecipeDeleted())
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleDeleteRecipeCancelled = () => setConfirmDeleteVisible(false)

  return (
    <View tag="article" align="">
      <View direction="row">
        <Text>{recipe.author.username}</Text>

        <Heading level="2">{recipe.title}</Heading>
      </View>

      <Thumbnail src={recipe.thumbnail} />

      <Text>{recipe.description}</Text>

      <View direction="row">
        <Button onClick={handleToggleLikeRecipe}>{`${
          recipe.likes.includes(logic.getUserId()) ? "❤️" : "🤍"
        }
                ${recipe.likes.length === 1 ? "" : "s"}`}</Button>
      </View>

      <View direction='"row'>
        <Time>{recipe.date}</Time>

        {recipe.author.id === logic.getUserId() && (
          <Button onClick={handleDeleteRecipe}>Delete</Button>
        )}
      </View>

      {confirmDeleteVisible && (
        <Confirm
          message="Delete Recipe?"
          onAccept={handleDeleteRecipeAcceptd}
          onCancel={handleDeleteRecipeCancelled}
        />
      )}
    </View>
  )
}

export default Recipe
