import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { GiExitDoor } from "react-icons/gi"
import { TiArrowBack } from "react-icons/ti"

import "./index.css"

import logic from "../../logic"
import RegisterCustomer from "../view/RegisterCustomer"

export default function Header({ iconUser, children, iconAddUser, onRegisterCustomer }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showRegisterCustomer, setShowRegisterCustomer] = useState(false)

  const handleLogout = () => {
    logic.logoutUser()
    navigate("/login")
  }

  const handleRegisterCustomer = () => {
    setShowRegisterCustomer(!showRegisterCustomer)
  }

  const handleCloseRegisterCustomer = () => {
    setShowRegisterCustomer(false)
    onRegisterCustomer()
  }

  return (
    <>
      <div className="Header">
        {location.pathname === "/customers" && (
          <div onClick={handleRegisterCustomer} className="IconAddCustomer">
            {iconAddUser}
          </div>
        )}
        <div className="Title">
          <div className="IconUser">{iconUser}</div>
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

      <div className="RegisterCustomer">
        {showRegisterCustomer && <RegisterCustomer onCloseRegisterCustomer={handleCloseRegisterCustomer} />}
      </div>
    </>
  )
}
