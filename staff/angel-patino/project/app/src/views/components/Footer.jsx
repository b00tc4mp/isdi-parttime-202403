import { Link } from "react-router-dom"
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
      className="Footer bottom-0 w-full bg-secondary-color shadow-lg py-2 flex justify-around items-center"
      direction="row"
    >
      <Link
        to="/"
        onClick={handleHomeClick}
        className="text-primary-color text-lg"
      >
        ⌂
      </Link>
      <Link
        to="/favorites"
        onClick={handleFavoritesClick}
        className="text-primary-color text-lg"
      >
        ❤️
      </Link>
      <Link
        to="/search"
        onClick={handleSearchClick}
        className="text-primary-color text-lg"
      >
        🔍
      </Link>
      <Link
        to="/create-recipe"
        onClick={handleCreateRecipeClick}
        className="text-primary-color text-lg"
      >
        +
      </Link>
      <Link
        to="/my-recipes"
        onClick={handleMyRecipesClick}
        className="text-primary-color text-lg"
      >
        👤
      </Link>
    </View>
  )
}

export default Footer
