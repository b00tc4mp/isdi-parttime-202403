import React, { useState } from 'react';
import Label from './Label';
import Input from './Input';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import './ShowHidePassword.css'

function ShowPasswordField({ id, placeholder, children }) {
  const [inputType, setInputType] = useState('password');

  const switchType = () => setInputType(inputType === 'password' ? 'text' : 'password');

  return (
    <div className="Field">
      <Label htmlFor={id}>{children}</Label>
      <div className="relative w-full">
        <Input id={id} type={inputType} placeholder={placeholder} className="Input" />
        <div className="EyeIcon" onClick={switchType}>
          {inputType === 'text' ? <IoIosEyeOff /> : <IoIosEye />}
        </div>
      </div>
    </div>
  );
}

export default ShowPasswordField;