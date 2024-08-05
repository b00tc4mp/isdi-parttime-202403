import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { RiFileUserLine } from "react-icons/ri"

import Header from "../Header"
import Footer from "../core/Footer"
import Main from "../core/Main"

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
        <div>
          {customer?.username && (
            <p>
              <span className="SpanColor">Nombre de Usuario</span>: {customer.username}
            </p>
          )}
          {customer?.companyName && (
            <p>
              <span className="SpanColor">Nombre Empresa</span>: {customer.companyName}
            </p>
          )}
          {customer?.email && (
            <p>
              <span className="SpanColor">Email</span>: {customer.email}
            </p>
          )}
          {customer?.taxId && (
            <p>
              <span className="SpanColor">CIF/NIF</span>: {customer.taxId}
            </p>
          )}
          {customer?.phone && (
            <p>
              <span className="SpanColor">Nº Teléfono</span>: {customer.phone}
            </p>
          )}
          {customer?.address && (
            <p>
              <span className="SpanColor"> Dirección</span>: {customer.address}
            </p>
          )}
        </div>
      </Main>

      <Footer>FactuClient</Footer>
    </>
  )
}
