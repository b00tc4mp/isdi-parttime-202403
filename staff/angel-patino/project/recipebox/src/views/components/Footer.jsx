import Button from "../../components/core/Button"
import View from "../../components/library/View"

function Footer({
  onCreateRecipeClick,
  onHomeClick,
  onFavoritesClick,
  onSearchClick,
  onMyRecipesClick, // New handler for viewing the user's own recipes
}) {
  const handleHomeClick = () => onHomeClick()
  const handleFavoritesClick = () => onFavoritesClick()
  const handleSearchClick = () => onSearchClick()
  const handleCreateRecipeClick = () => onCreateRecipeClick()
  const handleMyRecipesClick = () => onMyRecipesClick() // Handler for own recipes

  return (
    <View className="Footer" direction="row">
      <Button onClick={handleHomeClick}>⌂</Button>
      <Button onClick={handleFavoritesClick}>❤️</Button>
      <Button onClick={handleSearchClick}>🔍</Button>
      <Button onClick={handleCreateRecipeClick}>+</Button>
      <Button onClick={handleMyRecipesClick}>📚</Button>
      {/* Button for own recipes */}
    </View>
  )
}

export default Footer
