import { LiaFileInvoiceSolid } from "react-icons/lia"

import Header from "../Header"
import Main from "../core/Main"
import Footer from "../core/Footer"

import "./InvoiceList.css"

export default function InvoiceList() {
  return (
    <>
      <Header className="HeaderInvoices" iconUser={<LiaFileInvoiceSolid />}>
        Facturas
      </Header>
      <Main className="InvoiceList"></Main>
      <Footer>FactuClient</Footer>
    </>
  )
}
