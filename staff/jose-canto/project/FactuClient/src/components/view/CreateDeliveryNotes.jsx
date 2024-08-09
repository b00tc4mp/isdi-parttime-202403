import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { TfiSave } from "react-icons/tfi"
import { FiPlusSquare } from "react-icons/fi"

import logic from "../../logic/index"

import Header from "../Header"
import Main from "../core/Main"
import Footer from "../core/Footer"
import Time from "../core/Time"
import Field from "../core/Field"

import "./CreateDeliveryNotes.css"

export default function CreateDeliveryNotes() {
  const { customerId } = useParams()
  const [deliveryNote, setDeliveryNote] = useState(null)
  const [total, setTotal] = useState(0)
  const [showFormWork, setShowFormWork] = useState(false)
  const [deliveryNoteUpdated, setDeliveryNoteUpdated] = useState(null)

  useEffect(() => {
    try {
      //prettier-ignore
      logic.createDeliveryNote(customerId)
        .then((deliveryNote)=>{
          setDeliveryNote(deliveryNote)
        })
        .catch((error)=> alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }, [customerId])

  const handleCreateWork = (event) => {
    event.preventDefault()

    const target = event.target
    const concept = target.concept.value
    const quantity = parseFloat(target.quantity.value)
    const price = parseFloat(target.price.value)

    try {
      //prettier-ignore
      logic.createWork(deliveryNote._id, concept, quantity, price)
        .then((deliveryNoteUpdated) => {
          setDeliveryNoteUpdated(deliveryNoteUpdated)

          setShowFormWork(!showFormWork)

          const calculateTotal = deliveryNoteUpdated.works.reduce((accumulator, work) => accumulator + work.quantity * work.price, 0)
          setTotal(calculateTotal)

        })
        .catch((error) => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }

  const handleShowFormWork = () => {
    setShowFormWork(!showFormWork)
  }

  return (
    <>
      <Header>{deliveryNote?.company?.companyName && deliveryNote.company.companyName}</Header>
      <Main>
        <div className="DeliveryInfoCustomer">
          {deliveryNote?.customer && <p>{deliveryNote.customer.companyName}</p>}
          {deliveryNote?.customer && <p>{deliveryNote.customer.address}</p>}
          {deliveryNote?.customer && <p>{deliveryNote.customer.taxId}</p>}
        </div>
        <div className="DeliveryWork">
          <div className="TitleDateContainer">
            {deliveryNote?.number && <p className="DeliveryNumber">Albarán nº:{deliveryNote.number}</p>}
            {deliveryNote?.date && <Time className={"DeliveryDate"}>{deliveryNote.date}</Time>}
          </div>
          <div className="DeliveryTitleInfo">
            <h6>Concepto</h6>
            <div className="DeliveryTitleQuantityPrice">
              <h6>Cantidad</h6> <h6>Precio</h6> <h6>Total</h6>
            </div>
          </div>
          {deliveryNoteUpdated?.works &&
            deliveryNoteUpdated.works.map((work) => (
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

          {showFormWork && (
            <form className="FormWorkContainer" onSubmit={handleCreateWork}>
              <Field className="FormWorkConcept" id="concept" type="text" placeholder="Introduce concepto"></Field>
              <Field className="FormWorkQuantity" id="quantity" type="text" placeholder="Cantidad"></Field>
              <Field className="FormWorkPrice" id="price" type="text" placeholder="Precio"></Field>

              <div className="ContainerSaveButton">
                <button type="submit" className="SaveWorkButton">
                  <TfiSave />
                </button>
              </div>
            </form>
          )}

          <FiPlusSquare className="AddWorkButton" onClick={handleShowFormWork} />

          <div className="ObservationsContainer">
            {deliveryNote?.customer && <p className="Observations">Observaciones:{deliveryNote.observations}</p>}
          </div>
          <div className="DeliveryTotal">TOTAL: {total.toFixed(2)} € </div>
        </div>
      </Main>
      <Footer>FactuClient</Footer>
    </>
  )
}
