import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PiUserListBold } from "react-icons/pi"
import { PiUserCirclePlusBold } from "react-icons/pi"

import useContext from "../../useContext"
import { SystemError } from "com/errors"

import Header from "../Header"
import Footer from "../core/Footer"
import Main from "../core/Main"

import logic from "../../logic/index"

import "./CustomerList.css"

export default function CustomerList() {
  const [customers, setCustomers] = useState([])
  const [refresh, setRefresh] = useState(0)
  const { alert } = useContext()
  const [searchTerm, setSearchTerm] = useState("")

  const filterCustomers = () =>
    customers.filter((customer) => customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()))

  const loadCustomers = () => {
    try {
      // prettier-ignore
      logic.getAllCustomers()
        .then((customers) => {
          setCustomers(customers)
        })
        .catch((error) => {
          if (error instanceof SystemError) {
            alert(error.message)
          }
          alert("Todavía no hay clientes, Añade tu primer cliente")
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
        iconLeftHeader={<PiUserCirclePlusBold />}
        iconUser={<PiUserListBold />}
        onRegisterCustomer={handleRegisterCustomerSubmitted}
      >
        Listado Clientes
      </Header>

      <Main>
        <input
          className="-mb-8 -mt-3 w-[21rem] rounded-md border border-gray-500 p-2"
          type="text"
          placeholder="Busca nombre de cliente"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <ul className="CustomerList">
          {filterCustomers().map((customer) => (
            <Link to={`/customers/profile/${customer.id}`} key={customer.id}>
              {customer?.companyName && <li className="Customer">{customer.companyName}</li>}
            </Link>
          ))}
        </ul>
      </Main>

      <Footer>FactuClient</Footer>
    </>
  )
}
