import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"

import { RiFileUserLine } from "react-icons/ri"
import { MdDeleteForever } from "react-icons/md"

import useContext from "../../useContext"
import { SystemError } from "com/errors"

import Header from "../Header"
import Footer from "../core/Footer"
import Main from "../core/Main"
import Confirm from "../Confirm"
import ProfileInfoItem from "../ProfileItemInfo"
import Button from "../core/Button"

import logic from "../../logic"

import "./CustomerProfile.css"

export default function CustomerProfile() {
  const { alert } = useContext()
  const navigate = useNavigate()
  const { customerId } = useParams()
  const [customer, setCustomer] = useState(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [deliveryNotes, setDeliveryNotes] = useState([])
  const [invoices, setInvoices] = useState([])
  const [showCustomerData, setShowCustomerData] = useState("Data")
  const [showDeleteIcon, setShowDeleteIcon] = useState(true)

  useEffect(() => {
    try {
      //prettier-ignore
      logic.getProfileUser(customerId)
        .then((customer) => { 
          setCustomer(customer) 
        })
        .catch((error) => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }, [customerId])

  const handleDeleteCustomer = () => {
    try {
      //prettier-ignore
      logic.deleteCustomer(customerId)
        .then(() => {
          navigate(-1)
        })
        .catch((error) => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(!showConfirmDelete)
  }

  const handleGetAllDeliveryNotesCustomer = () => {
    try {
      setShowCustomerData("DeliveryNotes")
      setShowDeleteIcon("")
      //prettier-ignore
      logic.getAllDeliveryNotesCustomer(customerId)
        .then((deliveryNotes) => {
          setDeliveryNotes(deliveryNotes)
        })
        .catch((error) => {
          if (error instanceof SystemError) {
            alert(error.message)
          }
          alert("No hay Albaranes para este cliente")
        })
    } catch (error) {
      alert(error.message)
    }
  }

  const handleGetAllInvoicesCustomer = () => {
    try {
      setShowCustomerData("Invoices")
      setShowDeleteIcon("")
      //prettier-ignore
      logic.getAllInvoicesCustomer(customerId)
        .then((invoices) => {
          setInvoices(invoices)
        })
        .catch((error) => {
          if (error instanceof SystemError) {
            alert(error.message)
          }
          alert("No hay Facturas para este cliente")
        })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      {customer?.companyName && (
        <Header
          onDeleteCustomer={handleShowConfirmDelete}
          iconLeftHeader={showDeleteIcon && <MdDeleteForever />}
          iconUser={<RiFileUserLine />}
        >
          {customer.companyName}
        </Header>
      )}
      <Main className="CustomerProfile">
        {showCustomerData === "Data" && (
          <div className="ProfileInfoContainer">
            <ProfileInfoItem label="Nombre de usuario" value={customer?.username} />
            <ProfileInfoItem label="Empresa" value={customer?.companyName} />
            <ProfileInfoItem label="Email" value={customer?.email} />
            <ProfileInfoItem label="CIF/NIF" value={customer?.taxId} />
            <ProfileInfoItem label="Nº Móvil" value={customer?.phone} />
            <ProfileInfoItem label="Dirección	" value={customer?.address} />

            <div className="mt-10 flex w-full justify-center gap-12">
              <Button onClick={handleGetAllInvoicesCustomer} className="CustomerButtons">
                Facturas
              </Button>
              <Button onClick={handleGetAllDeliveryNotesCustomer} className="CustomerButtons">
                Albaranes
              </Button>
            </div>
          </div>
        )}

        {showCustomerData === "DeliveryNotes" && (
          <ul className="DeliveryList">
            {deliveryNotes.map((deliveryNote) => (
              <Link className="DeliveryLink" to={`/delivery-notes/${deliveryNote.id}`} key={deliveryNote.id}>
                <li className="DeliveryNote">
                  {deliveryNote?.number && <p>A/Nº: {deliveryNote.number}</p>}
                  {deliveryNote?.customer && <p>&nbsp;{deliveryNote.customer.companyName}</p>}
                </li>
              </Link>
            ))}
          </ul>
        )}

        {showCustomerData === "Invoices" && (
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
        )}

        {showConfirmDelete && (
          <Confirm handleDeleteCustomer={handleDeleteCustomer} setShowConfirmDelete={handleShowConfirmDelete} />
        )}
      </Main>

      <Footer>FactuClient</Footer>
    </>
  )
}
