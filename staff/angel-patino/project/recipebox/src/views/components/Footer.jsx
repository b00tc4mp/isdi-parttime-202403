import Button from "../../components/core/Button"

function Footer({ onCreateRecipeClick }) {
  const handleCreateRecipeClick = () => onCreateRecipeClick()

  return (
    <footer className="Footer">
      <Button>⌂</Button>
      <Button onClick={handleCreateRecipeClick}>+</Button>
      <Button>❤️</Button>
      <Button>🔍</Button>
    </footer>
  )
}

export default Footer
