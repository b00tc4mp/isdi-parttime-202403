import { TiArrowBack } from "react-icons/ti"

import { useNavigate } from "react-router-dom"

import "./index.css"

import logic from "../../logic"

export default function Header({ children }) {
  const navigate = useNavigate()
  const handleLogout = () => {
    logic.logoutUser()
    navigate("/login")
  }

  return (
    <>
      <div className="Header">
        <div className="EditUsername">
          <div className="EditIcon">{children}</div>
          <p>Nombre de Usuario</p>
        </div>
        <span className="IconExit">
          <TiArrowBack onClick={handleLogout} />
        </span>
      </div>
    </>
  )
}
