import "./Header.css"

function Header({ children }) {
	return (
		<>
			<header className="Header">
				<h1>{children}</h1>
			</header>
		</>
	)
}

export default Header
