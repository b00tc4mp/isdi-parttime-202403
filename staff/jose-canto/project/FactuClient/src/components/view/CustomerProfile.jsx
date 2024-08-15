import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { RiFileUserLine } from "react-icons/ri"
import { MdDeleteForever } from "react-icons/md"

import Header from "../Header"
import Footer from "../core/Footer"
import Main from "../core/Main"
import Confirm from "../Confirm"
import ProfileInfoItem from "../ProfileItemInfo"

import logic from "../../logic"

import "./CustomerProfile.css"

export default function CustomerProfile() {
  const navigate = useNavigate()
  const { customerId } = useParams()
  const [customer, setCustomer] = useState(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  useEffect(() => {
    try {
      //prettier-ignore
      logic.getProfileUser(customerId)
        .then((customer) => { 
          setCustomer(customer) 
        })
        .catch((error) => {alert(error.message)})
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

  return (
    <>
      {customer?.companyName && (
        <Header
          onDeleteCustomer={handleShowConfirmDelete}
          iconLeftHeader={<MdDeleteForever />}
          iconUser={<RiFileUserLine />}
        >
          {customer.companyName}
        </Header>
      )}
      <Main className="CustomerProfile">
        <div className="ProfileInfoContainer">
          <ProfileInfoItem label="Nombre de usuario" value={customer?.username} />
          <ProfileInfoItem label="Empresa" value={customer?.companyName} />
          <ProfileInfoItem label="Email" value={customer?.email} />
          <ProfileInfoItem label="CIF/NIF" value={customer?.taxId} />
          <ProfileInfoItem label="Nº Móvil" value={customer?.phone} />
          <ProfileInfoItem label="Dirección	" value={customer?.address} />
        </div>

        {showConfirmDelete && (
          <Confirm handleDeleteCustomer={handleDeleteCustomer} setShowConfirmDelete={handleShowConfirmDelete} />
        )}
      </Main>

      <Footer>FactuClient</Footer>
    </>
  )
}
