import Label from "../Label"
import Input from "../Input"
import "./index.css"

import { useState } from "react"

function ShowPasswordField({ id, placeholder, children, className }) {
  const [inputType, setInputType] = useState("password")

  const showPassword = () => setInputType(inputType === "password" ? "text" : "password")

  return (
    <div className={`ShowPasswordField ${className ? className : ""}`}>
      <Label htmlFor={id}>{children}</Label>
      <Input id={id} type={inputType} placeholder={placeholder} />
      <i
        className={`ShowPasswordFieldIcon ${
          inputType === "password" ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"
        }`}
        onClick={showPassword}
      ></i>
    </div>
  )
}

export default ShowPasswordField
