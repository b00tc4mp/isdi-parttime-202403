import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { GiStabbedNote } from "react-icons/gi"

import Header from "../Header"
import Main from "../core/Main"
import Time from "../core/Time"
import Footer from "../core/Footer"

import logic from "../../logic/index"

import "./DeliveryInfo.css"

export default function DeliveryInfo() {
  const { deliveryNoteId } = useParams()
  const [deliveryNote, setDeliveryNote] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    try {
      //prettier-ignore
      logic.getDeliveryNote(deliveryNoteId)
        .then((deliveryNote) => {
          setDeliveryNote(deliveryNote)


            const calculateTotal = deliveryNote.works.reduce((acc, work) => acc + work.quantity * work.price, 0)
            setTotal(calculateTotal)
        })
        .catch((error) => {
          alert.error(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }, [deliveryNoteId])

  return (
    <>
      <Header iconUser={<GiStabbedNote />} className={"HeaderDeliveryInfo"}></Header>
      <Main className={"MainDeliveryInfo"}>
        <div className="DeliveryInfoCustomer">
          {deliveryNote?.customer && <p>{deliveryNote.customer.companyName}</p>}
          {deliveryNote?.customer && <p>{deliveryNote.customer.address}</p>}
          {deliveryNote?.customer && <p>{deliveryNote.customer.taxId}</p>}
        </div>
        <div className="DeliveryWork">
          {deliveryNote?.date && <Time className={"DeliveryDate"}>{deliveryNote.date}</Time>}
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
          <div className="ObservationsContainer">{deliveryNote.observations}</div>
          <div className="DeliveryTotal">TOTAL: {total} </div>
        </div>
      </Main>
      <Footer>FactuClient</Footer>
    </>
  )
}
