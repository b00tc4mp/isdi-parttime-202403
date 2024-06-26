import "./Footer.css"
import Button from "../../components/core/Button"

function Footer({ onCreatePostClick }) {
  const handleCancelCreatePostClick = () => onCreatePostClick()
  return (
    <footer className="Footer">
      <Button onClick={handleCancelCreatePostClick}>✚</Button>
    </footer>
  )
}

export default Footer
