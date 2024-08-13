import Button from "../../components/core/Button"

function Footer({ onCreateRecipeClick }) {
  const handleCreateRecipeClick = () => onCreateRecipeClick()

  return (
    <footer className="Footer">
      {/* <Button onClick={handleHomeClick}>⌂</Button> */}
      <Button onClick={handleCreateRecipeClick}>+</Button>
      {/* <Button onClick={handleToggleLikeClick}>❤️</Button>
      <Button onClick={handleSearchClick}>🔍</Button> */}
    </footer>
  )
}

export default Footer
