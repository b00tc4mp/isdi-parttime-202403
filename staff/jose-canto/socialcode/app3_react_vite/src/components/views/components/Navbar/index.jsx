import { useState } from "react"

import Button from "../../../core/Button"

import logic from "../../../../logic"

import "./index.css"

function Navbar({ post, handleDeletePost, onClickEditPost }) {
  const [showNavbar, setShowNavbar] = useState(false)

  const toggleNavbarClick = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <>
      {post.author.id === logic.getUserId() && (
        <nav className="Navbar">
          <i
            className={`NavButton ${showNavbar ? "fa-solid fa-bars-staggered" : "fa-solid fa-bars"}`}
            onClick={toggleNavbarClick}
          ></i>
          {showNavbar && (
            <div className="Navbar_Container">
              <Button className="DeleteButton" onClick={handleDeletePost}>
                Delete
              </Button>
              <Button className="EditButton" onClick={onClickEditPost}>
                Edit
              </Button>
            </div>
          )}
        </nav>
      )}
    </>
  )
}

export default Navbar
