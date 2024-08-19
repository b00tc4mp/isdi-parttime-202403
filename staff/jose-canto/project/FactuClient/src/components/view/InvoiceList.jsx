import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LiaFileInvoiceSolid } from "react-icons/lia"

import Header from "../Header"
import Main from "../core/Main"
import Footer from "../core/Footer"

import logic from "../../logic"

import "./InvoiceList.css"

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const filterInvoices = () =>
    invoices.filter(
      (invoice) =>
        invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    )

  useEffect(() => {
    try {
      //prettier-ignore
      logic.getAllInvoices()
        .then((invoices) => {
          setInvoices(invoices)
        })
        .catch((error) => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }, [])

  return (
    <>
      <Header className="HeaderInvoices" iconUser={<LiaFileInvoiceSolid />}>
        Facturas
      </Header>
      <Main>
        <input
          className="-mb-5 -mt-2 w-[21rem] rounded-md border border-gray-500 p-2"
          type="text"
          placeholder="Buscar por número o nombre de Factura"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <ul className="InvoiceList">
          {filterInvoices().map((invoice) => (
            <Link className="InvoiceLink" key={invoice.id} to={`/invoices/${invoice.id}`}>
              <li className="Invoice" key={invoice.id}>
                {invoice?.number && <p>F/Nº: {invoice.number}</p>}
                {invoice?.customer && <p>&nbsp;{invoice.customer.companyName}</p>}
              </li>
            </Link>
          ))}
        </ul>
      </Main>
      <Footer>FactuClient</Footer>
    </>
  )
}
