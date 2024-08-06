import React, { useState, useEffect } from 'react';
import { IoWifi } from "react-icons/io5";
import { FaParking } from "react-icons/fa";
import { MdPool } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineFoodBank } from "react-icons/md";
import { BiHandicap } from "react-icons/bi";
import { MdOutlineRoomService } from "react-icons/md";

import './ServiceSelect.css'

function ServiceIcon({ Icon, name, isSelected, toggleSelect }) {
  return (
    <div
      onClick={() => toggleSelect(name)}
      style={{ cursor: 'pointer', color: isSelected ? 'black' : 'grey' }}
    >
      <Icon size={20} />
    </div>
  );
}

function ServicesSelect({ onSelectionChange }) {
  const [selectedServices, setSelectedServices] = useState([])
  const [selectedIcons, setSelectedIcons] = useState([])

  const services = [
    { name: 'wifi', icon: IoWifi },
    { name: 'parking', icon: FaParking },
    { name: 'pool', icon: MdPool },
    { name: 'pets', icon: MdOutlinePets },
    { name: 'foodBank', icon: MdOutlineFoodBank },
    { name: 'handicap', icon: BiHandicap },
    { name: 'atention', icon: MdOutlineRoomService }
  ];

  const toggleSelect = (service , Icon) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    )
    setSelectedIcons(prev => 
      prev.includes(Icon) ? prev.filter(icon => icon !== Icon) : [...prev, Icon]
      )
  };

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedIcons);
    }
  }, [selectedIcons, onSelectionChange]);

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
    </div>
  );
}

export default ServicesSelect;