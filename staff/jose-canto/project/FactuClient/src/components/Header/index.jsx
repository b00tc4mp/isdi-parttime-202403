import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { GiExitDoor } from "react-icons/gi"
import { TiArrowBack } from "react-icons/ti"

import "./index.css"

import logic from "../../logic"
import RegisterCustomer from "../RegisterCustomerForm"
import EditProfileForm from "../EditProfileForm"

export default function Header({ iconUser, children, iconLeftHeader, onRegisterCustomer }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showRegisterCustomer, setShowRegisterCustomer] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

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

  const handleEditProfile = () => {
    setShowEditProfile(!showEditProfile)
  }

  const handleCloseEditProfile = () => {
    setShowEditProfile(false)
  }

  return (
    <>
      <div className="Header">
        {location.pathname === "/customers" && (
          <div className="ContainerHeader">
            <div onClick={handleRegisterCustomer} className="IconLeftHeader">
              {iconLeftHeader}
            </div>
            <div className="Children">{children}</div>
          </div>
        )}
        {location.pathname === "/users/profile" && (
          <div className="ContainerHeader">
            <div onClick={handleEditProfile} className="IconLeftHeader">
              {iconLeftHeader}
            </div>
            <div className="Children">{children}</div>
          </div>
        )}

        {location.pathname === "/" && (
          <Link to="/users/profile">
            <div className="ContainerHeader">
              <div className="IconUser">{iconUser}</div>
              <div className="Children">{children}</div>
            </div>
          </Link>
        )}
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

      <div className="EditProfile">
        {showEditProfile && (
          <EditProfileForm onEditProfile={handleCloseEditProfile} onCloseEditProfile={handleCloseEditProfile} />
        )}
      </div>
    </>
  )
}
