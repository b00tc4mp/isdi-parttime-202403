import Button from "../../components/core/Button"
import View from "../../components/library/View"

function Footer({
  onCreateRecipeClick,
  onHomeClick,
  onFavoritesClick,
  onSearchClick,
  onMyRecipesClick,
}) {
  const handleHomeClick = () => onHomeClick()
  const handleFavoritesClick = () => onFavoritesClick()
  const handleSearchClick = () => onSearchClick()
  const handleCreateRecipeClick = () => onCreateRecipeClick()
  const handleMyRecipesClick = () => onMyRecipesClick()

  return (
    <View
      className="Footer  bottom-0 w-full bg-secondary-color shadow-lg py-2 flex justify-around items-center"
      direction="row"
    >
      <Button onClick={handleHomeClick} className="text-primary-color text-lg">
        ⌂
      </Button>
      <Button
        onClick={handleFavoritesClick}
        className="text-primary-color text-lg"
      >
        ❤️
      </Button>
      <Button
        onClick={handleSearchClick}
        className="text-primary-color text-lg"
      >
        🔍
      </Button>
      <Button
        onClick={handleCreateRecipeClick}
        className="text-primary-color text-lg"
      >
        +
      </Button>
      <Button
        onClick={handleMyRecipesClick}
        className="text-primary-color text-lg"
      >
        👤
      </Button>
    </View>
  )
}

export default Footer
