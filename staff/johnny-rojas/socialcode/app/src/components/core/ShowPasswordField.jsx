import Label from './Label'
import Input from './Input'

import { useState } from 'react'

function ShowPasswordField({ id, placeholder, children }) {
  const [inputType, setInputType] = useState('password')
  
  const switchType = () => setInputType(inputType === 'password' ? 'text' : 'password')

    return <div className="Field">
      <Label htmlFor={id}>{children}</Label>
      <Input id={id} type={inputType} placeholder={placeholder} />
      <div className="EyeIcon" onClick={switchType}>{inputType === 'text' ? '🙈' : '👁️'}</div>
    </div>
}

export default ShowPasswordField