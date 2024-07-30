import { useState } from 'react'
import './Field.css'
import Input from './Input'
import Label from './Label'

function Field({ id, type, placeholder, children }) {
  const [typePassword, setTypePassword] = useState('password')

  const showPassword = () => {
    setTypePassword(typePassword === 'password' ? 'text' : 'password')
  }

  return (
    <div className='Field'>
      <Label htmlFor={id} placeholder={placeholder}>
        {children}
      </Label>

      <Input
        id={id}
        type={
          id === 'password' || id === 'passwordRepeat' ? typePassword : type
        }
        placeholder={placeholder}
      />
      {(id === 'password' || id === 'passwordRepeat') && (
        <i
          className={`iconShowPass
            ${
              typePassword === 'password'
                ? 'fa-regular fa-eye'
                : 'fa-regular fa-eye-slash'
            }
          `}
          onClick={showPassword}
        ></i>
      )}
    </div>
  )
}

export default Field
