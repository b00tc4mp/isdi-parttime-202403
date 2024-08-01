import { FaUserTie } from "react-icons/fa"
import { RiLockPasswordLine } from "react-icons/ri"
import { MdOutlineEmail } from "react-icons/md"
import { MdOutlinePhoneAndroid } from "react-icons/md"
import { FaRegAddressCard } from "react-icons/fa"
import { HiOutlineIdentification } from "react-icons/hi"
import { FaUserTag } from "react-icons/fa"
import { MdWorkOutline } from "react-icons/md"

import "./index.css"

export default function Field({ id, type, placeholder }) {
  return (
    <>
      <div className="Field">
        <div className="Container-icon">
          <span className="Icon">
            {id === "username" ? (
              <FaUserTie />
            ) : id === "password" || id === "confirmPassword" ? (
              <RiLockPasswordLine />
            ) : id === "email" ? (
              <MdOutlineEmail />
            ) : id === "phone" ? (
              <MdOutlinePhoneAndroid />
            ) : id === "address" ? (
              <FaRegAddressCard />
            ) : id === "taxId" ? (
              <HiOutlineIdentification />
            ) : id === "companyName" ? (
              <MdWorkOutline />
            ) : null}
          </span>
        </div>
        <input type={type} placeholder={placeholder} id={id} required></input>
      </div>
    </>
  )
}
