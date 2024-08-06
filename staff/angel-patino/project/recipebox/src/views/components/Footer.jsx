import Button from "../../components/core/Button"

function Footer({ onCreatePostClick }) {
  const handleCreatePostClick = () => onCreatePostClick()

  return (
    <footer className="Footer">
      <Button onClick={handleHomeClick}>⌂</Button>
      <Button onClick={handleCreatePostClick}>+</Button>
      <Button onClick={handleToggleLikeClick}>❤️</Button>
      <Button onClick={handleSearchClick}>🔍</Button>
    </footer>
  )
}

export default Footer
