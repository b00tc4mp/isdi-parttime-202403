import React, { useState, useEffect } from 'react';
import { IoWifi } from "react-icons/io5";
import { FaParking } from "react-icons/fa";
import { MdPool } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineFoodBank } from "react-icons/md";
import { BiHandicap } from "react-icons/bi";
import { MdOutlineRoomService } from "react-icons/md";

import './ServiceSelect.css'

function ServiceIcon() {
  

  return (
    <div className='ServiceSelect'>
      <h2 className='TitleService'>Servicios</h2>
      <div style={{ display: 'flex', gap: '25px' }}>
        {services.map(({ name, icon }) => (
          <ServiceIcon
            key={name}
            Icon={icon}
            name={name}
            isSelected={selectedServices.includes(name)}
            toggleSelect={toggleSelect}
          />
        ))}
      </div>
      <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Accept Terms and Conditions
      </label>
      </div>
    </div>
  );
}

export default ServicesSelect;

//TODO checkbox onclick