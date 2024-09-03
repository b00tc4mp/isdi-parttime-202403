import Thumbnail from "../../components/core/Thumbnail"
import Heading from "../../components/core/Heading"
import Button from "../../components/core/Button"
import Text from "../../components/core/Text"
import Time from "../../components/core/Time"
import View from "../../components/library/View"
import logic from "../../logic"
import Confirm from "./Confirm"
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
  const [ingredientsVisible, setIngredientsVIsible] = useState(false)

  const handleToggleIngredients = () => {
    setIngredientsVIsible(!ingredientsVisible)
  }

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
    <View tag="article" className="recipe-card">
      <View direction="row" align="center" className="profile-section">
        <div className="profile-info">
          <img
            src="/path/to/profile-pic.jpg"
            alt="Profile"
            className="profile-image"
          />
          <Heading level="2" className="username">
            {recipe.author.username}
          </Heading>
        </div>
        <div>
          {recipe.author.id === logic.getUserId() && (
            <button onClick={handleEditRecipe} className="edit-button">
              Edit
            </button>
          )}
        </div>
      </View>

      <Thumbnail src={recipe.thumbnail} className="recipe-thumbnail" />

      <View direction="row" align="center" className="actions-section">
        <Button onClick={handleToggleLikeRecipe} className="like-button">
          {recipe.likes.includes(logic.getUserId()) ? "❤️" : "🤍"}
        </Button>
        <Text className="likes-count">{`${recipe.likes.length} ${
          recipe.likes.length === 1 ? "like" : "likes"
        }`}</Text>
      </View>

      <View className="recipe-content">
        <Heading level="3" className="recipe-title">
          {recipe.title}
        </Heading>
        <Text className="recipe-description">{recipe.description}</Text>
        <Text className="IngredientsTitle">Ingredients:</Text>
        <div className="ingredients-section">
          <Button
            onClick={handleToggleIngredients}
            className="ingredients-toggle"
          >
            {ingredientsVisible ? "⬆️" : "⬇️"}
          </Button>
          {ingredientsVisible && (
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                </li>
              ))}
            </ul>
          )}
        </div>

        <View className="rating-section">
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

        <Time className="timestamp">
          {new Date(recipe.date).toLocaleString()}
        </Time>
        {recipe.author.id === logic.getUserId() && (
          <>
            <Button onClick={handleDeleteRecipe} className="delete-button">
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
