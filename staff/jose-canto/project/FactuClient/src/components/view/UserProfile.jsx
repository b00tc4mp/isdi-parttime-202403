import { useEffect, useState } from "react"

import Header from "../Header"
import Main from "../core/Main"
import Footer from "../core/Footer"

import { LiaUserEditSolid } from "react-icons/lia"

import logic from "../../logic"
import extractPayloadJwt from "../../../utils/extractPayloadJwt"

import "./UserProfile.css"

export default function UserProfile() {
  const [user, setUser] = useState(null)

  let payload
  try {
    if (sessionStorage.token) {
      payload = extractPayloadJwt(sessionStorage.token)
    }
  } catch (error) {
    alert(error.message)
  }
  const { sub: userId } = payload

  useEffect(() => {
    try {
      //prettier-ignore
      logic.getProfileUser(userId)
        .then((user) => {
          setUser(user)
        })
        .catch((error) => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }, [user])

  return (
    <>
      <Header className="HeaderProfile" iconLeftHeader={<LiaUserEditSolid />}>
        {user?.companyLogo ? (
          <img className="CompanyLogo" src={user.companyLogo} alt="Company Logo" />
        ) : (
          user?.username && <h1>{user.username}</h1>
        )}
      </Header>

      <Main className="MainProfile">
        <div className="Profile">
          {user?.username && (
            <p>
              <span className="SpanColor">Nombre de Usuario</span>: {user.username}
            </p>
          )}
          {user?.email && (
            <p>
              <span className="SpanColor">Email</span>: {user.email}
            </p>
          )}
          {user?.fullName && (
            <p>
              <span className="SpanColor">Nombre y Apellidos</span>: {user.fullName}
            </p>
          )}
          {user?.companyName && (
            <p>
              <span className="SpanColor">Nombre de Empresa</span>: {user.companyName}
            </p>
          )}
          {user?.companyName && (
            <p>
              <span className="SpanColor">Dirección</span>: {user.address}
            </p>
          )}
          {user?.companyName && (
            <p>
              <span className="SpanColor">CIF/NIF</span>: {user.taxId}
            </p>
          )}
          {user?.companyName && (
            <p>
              <span className="SpanColor">Nº Móvil</span>: {user.phone}
            </p>
          )}
          {user?.companyName && (
            <p>
              <span className="SpanColor">Nº Cuenta IBAN</span>: {user.bankAccount}
            </p>
          )}
        </div>
      </Main>
      <Footer>FactuClient</Footer>
    </>
  )
}
