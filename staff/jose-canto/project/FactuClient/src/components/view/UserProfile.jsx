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
          <div className="ProfileInfo">
            <p className="SpanText">Nombre de Usuario</p>
            {user?.username && <p className="ProfileInfo">{user.username}</p>}
          </div>

          <div className="ProfileInfo">
            <p className="SpanText">Email</p>
            {user?.email && <p className="ProfileInfo">{user.email}</p>}
          </div>

          <div className="ProfileInfo">
            <p className="SpanText">Nombre y Apellidos</p>
            {user?.fullName && <p className="ProfileInfo">{user.fullName}</p>}
          </div>

          <div className="ProfileInfo">
            <p className="SpanText">Nombre de Empresa</p>
            {user?.companyName && <p className="ProfileInfo">{user.companyName}</p>}
          </div>

          <div className="ProfileInfo">
            <p className="SpanText">Dirección</p>
            {user?.address && <p className="ProfileInfo">{user.address}</p>}
          </div>

          <div className="ProfileInfo">
            <p className="SpanText">CIF/NIF</p>
            {user?.taxId && <p className="ProfileInfo">{user.taxId}</p>}
          </div>

          <div className="ProfileInfo">
            <p className="SpanText">Nº Móvil</p>
            {user?.phone && <p className="ProfileInfo">{user.phone}</p>}
          </div>

          <div className="ProfileInfo">
            <p className="SpanText">IBAN</p> {user?.bankAccount && <p className="ProfileInfo">{user.bankAccount}</p>}
          </div>
        </div>
      </Main>
      <Footer>FactuClient</Footer>
    </>
  )
}
