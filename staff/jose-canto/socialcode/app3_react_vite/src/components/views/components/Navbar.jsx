import { useState } from "react"

import Button from "../../core/Button"

import logic from "../../../logic"

import "./Navbar.css"

function Navbar({ post, handleDeletePost }) {
	const [showNavbar, setShowNavbar] = useState(false)

	const toggleNavbarClick = () => {
		setShowNavbar(!showNavbar)
	}

	return (
		<>
			{post.author === logic.getLoggedInUsername() && (
				<nav className="Navbar">
					<i
						className={`NavButton ${showNavbar ? "fa-solid fa-bars-staggered" : "fa-solid fa-bars"}`}
						onClick={toggleNavbarClick}
					></i>
					{showNavbar && (
						<div className="Delete_Container">
							<Button className="DeleteButton" onClick={handleDeletePost}>
								Delete
							</Button>
						</div>
					)}
				</nav>
			)}
		</>
	)
}

export default Navbar
