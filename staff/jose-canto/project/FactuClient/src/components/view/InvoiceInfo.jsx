import { useParams } from "react-router-dom"
import { useEffect, useState, Fragment } from "react"
import { useNavigate } from "react-router-dom"

import { MdDeleteForever } from "react-icons/md"

import Header from "../Header"
import Main from "../core/Main"
import Footer from "../core/Footer"
import Title from "../Title"
import Confirm from "../Confirm"

import logic from "../../logic/index"

import "./InvoiceInfo.css"
import Time from "../core/Time"

export default function InvoiceInfo() {
  const navigate = useNavigate()

  const { invoiceId } = useParams()
  const [invoice, setInvoice] = useState(null)
  const [total, setTotal] = useState(0)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [iva, setIva] = useState(0)

  useEffect(() => {
    try {
      //prettier-ignore
      logic.getInvoice(invoiceId)
        .then((invoice) => {
          setInvoice(invoice)

          const calculateTotal = invoice.deliveryNotes.reduce((accumulator, deliveryNote) => {
            return accumulator + deliveryNote.works.reduce((acc, work) => acc + work.quantity * work.price, 0)
          }, 0)

          setTotal(calculateTotal)
          setIva(calculateTotal * 0.21) 
        })
        .catch((error) => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }, [invoiceId])

  const handleDeleteInvoice = () => {
    try {
      //prettier-ignore
      logic.deleteInvoice(invoiceId)
        .then(() => {
          navigate(-1)
        })
        .catch((error) => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(!showConfirmDelete)
  }

  return (
    <>
      <Header iconLeftHeader={<MdDeleteForever />} className="InvoiceHeader" onDeleteInvoice={handleShowConfirmDelete}>
        <Title className="TitleInvoice" level={2}>
          Factura Nº: {invoice?.number && invoice.number}
          {invoice?.customer && <p>{invoice.customer.companyName}</p>}
        </Title>
      </Header>

      <Main className="MainInvoiceInfo">
        <div className="DataContainer">
          <div className="CompanyData">
            {invoice?.company && <p>{invoice.company.companyName}</p>}
            {invoice?.company && <p>{invoice.company.address}</p>}
            {invoice?.company && <p>{invoice.company.taxId}</p>}
            {invoice?.company && <p>{invoice.company.email}</p>}
            {invoice?.company && <p>{invoice.company.phone}</p>}
          </div>

          <div className="CustomerData">
            <p className="DataText">DATOS CLIENTE:</p>
            {invoice?.customer && <p>{invoice.customer.companyName}</p>}
            {invoice?.customer && <p>{invoice.customer.address}</p>}
            {invoice?.customer && <p>{invoice.customer.taxId}</p>}
            {invoice?.customer && <p>{invoice.customer.email}</p>}
            {invoice?.customer && <p>{invoice.customer.phone}</p>}
          </div>
        </div>
        <div className="InvoiceContainer">
          <div className="NumberDateContainer">
            {invoice?.number && <p className="InvoiceNumber">Fra.Nº: {invoice.number}</p>}
            {invoice?.date && (
              <div className="InvoiceDate">
                <p>Fecha Factura:</p>
                <Time>{invoice.date}</Time>
              </div>
            )}
          </div>
          <div className="HeaderTable">
            <div>Concepto</div>
            <div className="HeaderTotal">
              <div className="QuantityHeader">Cantidad</div>
              <div>Precio</div>
              <div>Total</div>
            </div>
          </div>
          <div className="BodyTable">
            {invoice?.deliveryNotes.map((deliveryNote) => (
              <Fragment key={deliveryNote.id}>
                <div className="BodyInfo">
                  {deliveryNote?.number && (
                    <div className="InvoiceNumber">
                      A/Nº {deliveryNote.number} <Time>{deliveryNote.date}</Time>
                    </div>
                  )}
                </div>
                {deliveryNote?.works.map((work) => (
                  <div className="Info" key={work.id}>
                    <div className="w-[41rem]">{work.concept}</div>
                    <div className="QuantityInfo">
                      <div className="QuantityBody">{work.quantity.toFixed(2)}</div>
                      <div className="PriceWork">{work.price.toFixed(2)}</div>
                      <div className="ml-2">{(work.quantity * work.price).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
        <p className="InvoiceTotal">TOTAL: {total.toFixed(2)} € </p>
        <p className="InvoiceTotal">21% IVA: {iva.toFixed(2)} € </p>
        <p className="InvoiceTotal">TOTAL con IVA: {(total + iva).toFixed(2)} € </p>
        <div className="PaymentType">
          {invoice?.paymentType && <p>Forma de pago: {invoice.paymentType} </p>}
          {invoice?.company && <p>{invoice.company.bankAccount}</p>}
        </div>
        {showConfirmDelete && (
          <Confirm handleDeleteInvoice={handleDeleteInvoice} setShowConfirmDelete={handleShowConfirmDelete} />
        )}
      </Main>

      <Footer>FactuClient</Footer>
    </>
  )
}
