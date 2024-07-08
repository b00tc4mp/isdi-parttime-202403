import "./Header.css"

function Header({ children }) {
  console.log("Header -> render")
  return <header className="Header">{children}</header>
}

export default Header
