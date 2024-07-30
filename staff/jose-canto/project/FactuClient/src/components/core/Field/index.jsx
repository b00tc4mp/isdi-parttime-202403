import { FaUserTie } from "react-icons/fa"
import { RiLockPasswordLine } from "react-icons/ri"
import { MdOutlineEmail } from "react-icons/md"

import "./index.css"

export default function Field({ children, id, type, placeholder }) {
  return (
    <>
      <div className="Field">
        <label htmlFor={id}>{children}</label>
        <div className="Container-icon">
          <span className="Icon">
            {id === "username" ? (
              <FaUserTie />
            ) : id === "password" || id === "confirmPassword" ? (
              <RiLockPasswordLine />
            ) : (
              <MdOutlineEmail />
            )}
          </span>
        </div>
        <input type={type} placeholder={placeholder} id={id} required></input>
      </div>
    </>
  )
}
