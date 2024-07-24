import { Link } from "react-router-dom"

import "./index.css"

function Header({ children }) {
  console.log("Header --> render")
  return (
    <>
      <header className="Header">
        <div className="Container-Logo">
          <Link className="Logo" to="/">
            <div className="Logo">SOCIAL CODE 🏘</div>
          </Link>
        </div>

        {children}
      </header>
    </>
  )
}

export default Header
