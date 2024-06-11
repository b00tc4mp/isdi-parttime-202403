import "./Header.css"

function Header({ children }) {
	console.log("Header --> render")
	return (
		<>
			<header className="Header">
				<div className="Logo"> SOCIAL CODE</div>
				{children}
			</header>
		</>
	)
}

export default Header
