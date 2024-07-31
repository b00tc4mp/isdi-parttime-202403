import { useEffect, useState } from "react"
import { PiUserListBold } from "react-icons/pi"

import Header from "../Header"
import Footer from "../core/Footer"

import logic from "../../logic/index"

export default function CustomerList() {
  const [customers, setCustomers] = useState([])

  const loadCustomers = () => {
    try {
      //prettier-ignore
      logic.getAllCustomers()
        .then((customers) => {
          console.log(`Customers list obtained ${customers}`)
          setCustomers((prevCustomers)=> [...prevCustomers, ...customers])
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
  }, [])

  return (
    <>
      <Header icon={<PiUserListBold />}>Listado Clientes</Header>

      <main>
        <ul>
          {customers.map((customer, index) => (
            <li key={index}>{customer.companyName}</li>
          ))}
        </ul>
      </main>

      <div className="ContainerFooter">
        <Footer>FactuClient</Footer>
      </div>
    </>
  )
}
