import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Header from "../Header"
import Main from "../core/Main"
import Footer from "../core/Footer"

import logic from "../../logic/index"
import Title from "../Title"

import "./NewDeliveryNotes.css"

export default function NewDeliveryNotes() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    try {
      //prettier-ignore
      logic.getAllCustomers()
        .then((customers) => {
          setCustomers(customers)
        })
        .catch((error) => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }, [])

  return (
    <>
      <Header>
        <div>
          <p>Crear Albarán</p>
          <p>Selecciona Un Cliente</p>
        </div>
      </Header>
      <Main className="MainCreateDelivery">
        <ul className="CustomerList">
          {customers.map((customer) => (
            <Link to={`/create/delivery-notes/${customer.id}`} key={customer.id}>
              {customer?.companyName && <li className="Customer">{customer.companyName}</li>}
            </Link>
          ))}
        </ul>
      </Main>
      <Footer>FactuClient</Footer>
    </>
  )
}
