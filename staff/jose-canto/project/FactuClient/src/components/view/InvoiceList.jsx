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
  })

  return (
    <>
      <Header className="HeaderInvoices" iconUser={<LiaFileInvoiceSolid />}>
        Facturas
      </Header>
      <Main>
        <ul className="InvoiceList">
          {invoices.map((invoice) => (
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
