import { useEffect, useState } from "react"
import { PiUserListBold } from "react-icons/pi"
import { PiUserCirclePlusBold } from "react-icons/pi"

import Header from "../Header"
import Footer from "../core/Footer"

import logic from "../../logic/index"

import "./CustomerList.css"

export default function CustomerList() {
  const [customers, setCustomers] = useState([])
  const [refresh, setRefresh] = useState(0)

  const loadCustomers = () => {
    try {
      //prettier-ignore
      logic.getAllCustomers()
        .then((customers) => {
          setCustomers(customers)
        })
        .catch((error) => {
          console.error(error)
          alert(error.message)
        })
    } catch (error) {
      console.error(error.message)
      alert(error.message)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [refresh])

  const handleRegisterCustomerSubmitted = () => {
    setRefresh(Date.now())
  }
  return (
    <>
      <Header
        iconAddUser={<PiUserCirclePlusBold />}
        iconUser={<PiUserListBold />}
        onRegisterCustomer={handleRegisterCustomerSubmitted}
      >
        Listado Clientes
      </Header>

      <main className="MainList">
        <ul className="CustomerList">
          {customers.map((customer, index) => (
            <li className="Customer" key={index}>
              {customer.companyName}
            </li>
          ))}
        </ul>
      </main>

      <div className="ContainerFooter">
        <Footer>FactuClient</Footer>
      </div>
    </>
  )
}
