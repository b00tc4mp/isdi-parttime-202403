import Field from "../core/Field"
import Button from "../core/Button"

import "./index.css"

import logic from "../../logic"
import extractPayloadJwt from "../../../utils/extractPayloadJwt"

export default function EditProfileForm({ onEditProfile }) {
  let payload
  try {
    if (sessionStorage.token) {
      payload = extractPayloadJwt(sessionStorage.token)
    }
  } catch (error) {
    alert(error.message)
  }
  const { sub: userId } = payload

  const handleEditProfileForm = (event) => {
    event.preventDefault()

    const target = event.target

    const username = target.username.value
    const email = target.email.value
    const companyName = target.companyName.value
    const address = target.address.value
    const taxId = target.taxId.value
    const phone = target.phone.value

    const updates = {
      username,
      email,
      companyName,
      address,
      taxId,
      phone
    }

    try {
      // prettier-ignore
      logic.editProfile(userId, updates)
        .then(() => {
          onEditProfile()
        })
        .catch((error) => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <>
        <form className="EditProfileForm" onSubmit={handleEditProfileForm}>
          <Field id="username" type="text" placeholder="Nombre de usuario" required={false}></Field>
          <Field id="companyName" type="text" placeholder="Nombre Empresa" required={false}></Field>
          <Field id="taxId" type="text" placeholder="CIF/NIF" required={false}></Field>
          <Field id="email" type="email" placeholder="Email" required={false}></Field>
          <Field id="address" type="text" placeholder="Dirección" required={false}></Field>
          <Field id="phone" type="text" placeholder="Número de Móvil" required={false}></Field>
          <Button type="submit">Editar</Button>
        </form>
      </>
    </>
  )
}
