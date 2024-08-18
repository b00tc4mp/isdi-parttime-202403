import Thumbnail from "../../components/core/Thumbnail"
import Heading from "../../components/core/Heading"
import Button from "../../components/core/Button"
import Text from "../../components/core/Text"
import Time from "../../components/core/Time"
import View from "../../components/library/View"
import logic from "../../logic"
import { useState } from "react"

function Recipe({
  recipe,
  onRecipeDeleted,
  onRecipeLikeToggled,
  onRecipeRated,
  onEditRecipeClick,
}) {
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
  const [rating, setRating] = useState(recipe.userRating || 0)

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

  const handleDeleteRecipeAccepted = () => {
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

  const handleEditRecipe = () => {
    onEditRecipeClick(recipe.id)
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating)
    try {
      logic
        .rateRecipe(recipe.id, newRating)
        .then(() => onRecipeRated())
        .catch((error) => {
          console.error(error)
          alert(error.message)
        })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <View tag="article" className="Recipe">
      <View direction="row" align="center" className="ProfileSection">
        <img
          src="/path/to/profile-pic.jpg"
          alt="Profile"
          className="ProfileImage"
        />
        <Heading level="2" className="Username">
          {recipe.author.username}
        </Heading>
        <Button onClick={handleEditRecipe}>Edit</Button>
      </View>

      <Thumbnail src={recipe.thumbnail} className="Thumbnail" />

      <View direction="row" align="center" className="Actions">
        <Button onClick={handleToggleLikeRecipe} className="p-0">
          {recipe.likes.includes(logic.getUserId()) ? "❤️" : "🤍"}
        </Button>
        <Text className="LikesCount">{`${recipe.likes.length} ${
          recipe.likes.length === 1 ? "like" : "likes"
        }`}</Text>
      </View>

      <View className="Content">
        <Heading level="3" className="Title">
          {recipe.title}
        </Heading>
        <Text className="Description">{recipe.description}</Text>

        <View className="Rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`p-0 ${
                star <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              ★
            </Button>
          ))}
        </View>

        <Time className="Timestamp">
          {new Date(recipe.date).toLocaleString()}
        </Time>
        {recipe.author.id === logic.getUserId() && (
          <>
            <Button onClick={handleDeleteRecipe} className="DeleteButton">
              Delete
            </Button>
          </>
        )}
      </View>

      {confirmDeleteVisible && (
        <Confirm
          message="Delete Recipe?"
          onAccept={handleDeleteRecipeAccepted}
          onCancel={handleDeleteRecipeCancelled}
        />
      )}
    </View>
  )
}

export default Recipe
