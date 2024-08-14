import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PDFDownloadLink } from "@react-pdf/renderer"

import { GiStabbedNote } from "react-icons/gi"
import { MdDeleteForever } from "react-icons/md"

import Header from "../Header"
import Main from "../core/Main"
import Time from "../core/Time"
import Footer from "../core/Footer"
import Confirm from "../Confirm"
import DeliveryNotePDF from "./DeliveryNotePDF"

import logic from "../../logic/index"

import "./DeliveryInfo.css"

export default function DeliveryInfo() {
  const navigate = useNavigate()
  const { deliveryNoteId } = useParams()
  const [deliveryNote, setDeliveryNote] = useState(null)
  const [total, setTotal] = useState(0)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  useEffect(() => {
    try {
      //prettier-ignore
      logic.getDeliveryNote(deliveryNoteId)
        .then((deliveryNote) => {
          setDeliveryNote(deliveryNote)

            const calculateTotal = deliveryNote.works.reduce((accumulator, work) => accumulator + work.quantity * work.price, 0)
            setTotal(calculateTotal)
        })
        .catch((error) => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }, [deliveryNoteId])

  const handleDeleteDeliveryNote = () => {
    try {
      //prettier-ignore
      logic.deleteDeliveryNote(deliveryNoteId)
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
      <Header
        iconUser={<GiStabbedNote />}
        iconLeftHeader={<MdDeleteForever />}
        className={"HeaderDeliveryInfo"}
        onDeleteDeliveryNote={handleShowConfirmDelete}
      ></Header>

      <Main className={"MainDeliveryInfo"}>
        <div className="DeliveryInfoCustomer">
          {deliveryNote?.customer && <p>{deliveryNote.customer.companyName}</p>}
          {deliveryNote?.customer && <p>{deliveryNote.customer.address}</p>}
          {deliveryNote?.customer && <p>{deliveryNote.customer.taxId}</p>}
        </div>
        <div className="DeliveryWork">
          <div className="TitleDateContainer">
            {deliveryNote?.number && <p className="DeliveryNumber">Albarán nº: {deliveryNote.number}</p>}
            {deliveryNote?.date && <Time className={"DeliveryDate"}>{deliveryNote.date}</Time>}
          </div>
          <div className="DeliveryTitleInfo">
            <h6>Concepto</h6>
            <div className="DeliveryTitleQuantityPrice">
              <h6>Cantidad</h6> <h6>Precio</h6> <h6>Total</h6>
            </div>
          </div>
          {deliveryNote?.works &&
            deliveryNote.works.map((work) => (
              <div className="DeliveryWorkInfo" key={work._id}>
                <p className="DeliveryWorkConcept">{work.concept}</p>
                <div className="DeliveryQuantityPrice">
                  <div className="QuantityContainer">
                    <p className="Quantity">{work.quantity.toFixed(2)}</p>
                  </div>
                  <div className="PriceContainer">
                    <p className="Price">{work.price.toFixed(2)}</p>
                  </div>
                  <div className="TotalContainer">
                    <p className="Total">{(work.quantity * work.price).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          <div className="ObservationsContainer">
            {deliveryNote?.customer && <p className="Observations">Observaciones:{deliveryNote.observations}</p>}
          </div>
          <div className="DeliveryTotal">TOTAL: {total.toFixed(2)} €</div>
        </div>

        {showConfirmDelete && (
          <Confirm handleDeleteDeliveryNote={handleDeleteDeliveryNote} setShowConfirmDelete={handleShowConfirmDelete} />
        )}
        {deliveryNote && (
          <PDFDownloadLink
            document={<DeliveryNotePDF deliveryNote={deliveryNote} total={total} />}
            fileName={`delivery-note-${deliveryNote.number}.pdf`}
          >
            {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
          </PDFDownloadLink>
        )}
      </Main>

      <Footer>FactuClient</Footer>
    </>
  )
}
