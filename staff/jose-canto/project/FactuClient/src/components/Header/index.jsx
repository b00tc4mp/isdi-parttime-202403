import { useNavigate, useLocation } from "react-router-dom"
import { GiExitDoor } from "react-icons/gi"
import { TiArrowBack } from "react-icons/ti"

import "./index.css"

import logic from "../../logic"

export default function Header({ icon, children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logic.logoutUser()
    navigate("/login")
  }
  return (
    <>
      <div className="Header">
        <div className="EditUsername">
          <div className="EditIcon">{icon}</div>
          <p>{children}</p>
        </div>

        <span className="IconExit">
          {location.pathname === "/" ? (
            <GiExitDoor onClick={handleLogout} />
          ) : (
            <TiArrowBack onClick={() => navigate(-1)} />
          )}
        </span>
      </div>
    </>
  )
}
