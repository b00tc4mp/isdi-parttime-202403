import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { PiUserListBold } from "react-icons/pi"
import { PiUserCirclePlusBold } from "react-icons/pi"

import Header from "../Header"
import Footer from "../core/Footer"
import Main from "../core/Main"

import logic from "../../logic/index"

import "./CustomerList.css"

export default function CustomerList() {
  const navigate = useNavigate()
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

      <Main className="MainList">
        <ul className="CustomerList">
          {customers.map((customer) => (
            <Link to={`/customers/profile/${customer.id}`}>
              <li className="Customer" key={customer.id}>
                {customer.companyName}
              </li>
            </Link>
          ))}
        </ul>
      </Main>

      <div className="ContainerFooter">
        <Footer>FactuClient</Footer>
      </div>
    </>
  )
}
