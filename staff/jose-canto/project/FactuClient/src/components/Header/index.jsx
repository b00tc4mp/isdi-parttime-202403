import { useState } from "react"
import { useNavigate, useLocation, Link, matchPath } from "react-router-dom"
import { GiExitDoor } from "react-icons/gi"
import { TiArrowBack } from "react-icons/ti"

import "./index.css"

import logic from "../../logic"
import RegisterCustomer from "../RegisterCustomerForm"
import EditProfileForm from "../EditProfileForm"

export default function Header({ className, iconUser, children, iconLeftHeader, onRegisterCustomer }) {
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
    setShowEditProfile(!showEditProfile)
  }

  const isCustomerProfilePathCustomerId = matchPath("/customers/profile/:customerId", location.pathname)
  const isCustomerProfilePathDeliveryNoteId = matchPath("/delivery-notes/:deliveryNoteId", location.pathname)
  const isCustomerProfilePathCreateDeliveryNoteId = matchPath("/create/delivery-notes/:customerId", location.pathname)
  const isCustomerProfilePathInvoiceId = matchPath("/invoices/:invoiceId", location.pathname)

  return (
    <>
      <div className={`Header ${className ? className : ""}`}>
        {location.pathname === "/customers" && (
          <div className="ContainerHeader">
            <div onClick={handleRegisterCustomer} className="IconLeftHeader">
              {iconLeftHeader}
            </div>
            <div className="IconUser">{iconUser}</div>
            <div className="Children">{children}</div>
          </div>
        )}

        {location.pathname === "/users/profile" && (
          <div className="ContainerHeader">
            <div onClick={handleEditProfile} className="IconLeftHeader">
              {iconLeftHeader}
            </div>
            <div className="IconUser">{iconUser}</div>
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

        {location.pathname === "/invoices" && (
          <div className="ContainerHeader">
            <div className="IconUser">{iconUser}</div>
            <div className="Children">{children}</div>
          </div>
        )}

        {isCustomerProfilePathInvoiceId && (
          <div className="ContainerHeader">
            <div className="IconUser">{iconUser}</div>
            <div className="Children">{children}</div>
          </div>
        )}

        {location.pathname === "/delivery-notes" && (
          <div className="ContainerHeader">
            <div className="IconUser">{iconUser}</div>
            <div className="Children">{children}</div>
          </div>
        )}

        {location.pathname === "/create/delivery-notes" && (
          <div className="ContainerHeader">
            <div className="IconUser">{iconUser}</div>
            <div className="Children">{children}</div>
          </div>
        )}

        {isCustomerProfilePathCustomerId && (
          <div className="ContainerHeader">
            <div className="IconUser">{iconUser}</div>
            <div className="Children">{children}</div>
          </div>
        )}

        {isCustomerProfilePathDeliveryNoteId && (
          <div className="ContainerHeader">
            <div className="IconUser">{iconUser}</div>
            <div className="Children">{children}</div>
          </div>
        )}

        {isCustomerProfilePathCreateDeliveryNoteId && (
          <div className="ContainerHeader">
            <div className="IconUser">{iconUser}</div>
            <div className="Children">{children}</div>
          </div>
        )}
      </div>

      <span className="IconExit">
        {location.pathname === "/" ? (
          <GiExitDoor onClick={handleLogout} />
        ) : (
          <TiArrowBack onClick={() => navigate(-1)} />
        )}
      </span>

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
