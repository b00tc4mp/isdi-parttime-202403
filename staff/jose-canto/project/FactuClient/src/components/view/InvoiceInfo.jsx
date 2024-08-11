import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Header from "../Header"
import Main from "../core/Main"
import Footer from "../core/Footer"
import Title from "../Title"

import logic from "../../logic/index"

import "./InvoiceInfo.css"
export default function InvoiceInfo() {
  const { invoiceId } = useParams()
  const [invoice, setInvoice] = useState(null)

  useEffect(() => {
    try {
      //prettier-ignore
      logic.getInvoice(invoiceId)
        .then((invoice) => {
          setInvoice(invoice)
        })
        .catch((error) => {
          alert.error(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }, [invoice])

  return (
    <>
      <Header className="InvoiceHeader">
        {invoice?.number && (
          <Title className="TitleInvoice" level={2}>
            Fra.Nº {invoice.number}{" "}
          </Title>
        )}
      </Header>

      <Main className="MainInvoiceInfo">
        {invoice?.number && <p>{invoice.number}</p>}
        {invoice?.customer && <p>{invoice.customer.companyName}</p>}
        {invoice?.company && <p>{invoice.company.companyName}</p>}
        {invoice?.company && <p>{invoice.company.address}</p>}
      </Main>

      <Footer>FactuClient</Footer>
    </>
  )
}
