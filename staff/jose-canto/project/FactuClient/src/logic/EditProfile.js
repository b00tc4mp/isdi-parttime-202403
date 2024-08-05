import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const editProfile = (userId, updates) => {
  validate.id(userId, "userId")

  if (updates.username) validate.username(updates.username, "username")
  if (updates.email) validate.email(updates.email, "email")
  if (updates.fullName) validate.name(updates.fullName, "fullName")
  if (updates.companyName) validate.companyName(updates.companyName, "companyName")
  if (updates.address) validate.address(updates.address, "address")
  if (updates.taxId) validate.taxId(updates.taxId, "taxId")
  if (updates.phone) validate.phone(updates.phone, "phone")
  if (updates.bankAccount) validate.iban(updates.bankAccount, "bankAccount")
  if (updates.companyLogo) validate.url(updates.companyLogo)

  return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.token}`
    },
    body: JSON.stringify(updates)
  })
    .catch(() => { throw new SystemError("connection error") })
    .then(response => {
      if (response.status === 200) {
        console.log("user edited")
        return
      }

      return response.json()
        .catch(() => { throw new SystemError("connection error") })
        .then((body) => {
          const { error, message } = body
          const constructor = errors[error]
          throw new constructor(message)
        })
    })
}

export default editProfile