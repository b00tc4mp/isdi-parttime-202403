import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { RiFileUserLine } from "react-icons/ri"

import Header from "../Header"
import Footer from "../core/Footer"
import Main from "../core/Main"
import ProfileInfoItem from "../ProfileItemInfo"

import logic from "../../logic"

import "./CustomerProfile.css"

export default function CustomerProfile() {
  const { customerId } = useParams()
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    try {
      //prettier-ignore
      logic.getProfileUser(customerId)
        .then((customer) => { 
          setCustomer(customer) 
        })
        .catch((error) => {alert(error.message)})
    } catch (error) {
      alert(error.message)
    }
  }, [customerId])

  return (
    <>
      {customer?.companyName && <Header iconUser={<RiFileUserLine />}>{customer.companyName}</Header>}
      <Main className="CustomerProfile">
        <div className="ProfileInfoContainer">
          <ProfileInfoItem label="Nombre de usuario" value={customer?.username} />
          <ProfileInfoItem label="Empresa" value={customer?.companyName} />
          <ProfileInfoItem label="Email" value={customer?.email} />
          <ProfileInfoItem label="CIF/NIF" value={customer?.taxId} />
          <ProfileInfoItem label="Nº Móvil" value={customer?.phone} />
          <ProfileInfoItem label="Dirección	" value={customer?.address} />
        </div>
      </Main>

      <Footer>FactuClient</Footer>
    </>
  )
}
