import Button from "./Button"

function Footer({ onCreatePostClick, onClickScrollTop }) {
  const handleCreatePostClick = () => onCreatePostClick()

  return (
    <>
      <footer className="Footer">
        <Button onClick={handleCreatePostClick}>+</Button>
        <i className="fa-solid fa-arrow-up-long" onClick={onClickScrollTop}></i>
      </footer>
    </>
  )
}

export default Footer
