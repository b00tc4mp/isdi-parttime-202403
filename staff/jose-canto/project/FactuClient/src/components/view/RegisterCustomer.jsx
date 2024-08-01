import { useState } from "react"

import Field from "../core/Field"
import Button from "../core/Button"

import "./RegisterCustomer.css"

import logic from "../../logic/index"

export default function RegisterCustomer({ onCloseRegisterCustomer }) {
  const handleRegisterCustomerSubmit = (event) => {
    event.preventDefault()

    const target = event.target

    const username = target.username.value
    const companyName = target.companyName.value
    const taxId = target.taxId.value
    const email = target.email.value
    const password = target.password.value
    const address = target.address.value
    const phone = target.phone.value

    try {
      //prettier-ignore
      logic.registerCustomer(username, companyName, email, password, taxId, address, phone )
        .then(() => {
          onCloseRegisterCustomer()     
        })
        .catch(() => {})
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <>
      <form className="RegisterCustomerForm" onSubmit={handleRegisterCustomerSubmit}>
        <Field id="username" type="text" placeholder="Nombre de usuario"></Field>
        <Field id="password" type="text" placeholder="Password Cliente"></Field>
        <Field id="companyName" type="text" placeholder="Nombre Empresa"></Field>
        <Field id="taxId" type="text" placeholder="CIF/NIF"></Field>
        <Field id="email" type="email" placeholder="Email"></Field>
        <Field id="address" type="text" placeholder="Dirección"></Field>
        <Field id="phone" type="text" placeholder="Número de Móvil"></Field>
        <Button type="submit">Registrar Cliente</Button>
      </form>
    </>
  )
}
