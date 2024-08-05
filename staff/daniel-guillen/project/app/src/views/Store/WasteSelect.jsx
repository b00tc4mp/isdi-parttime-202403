import React from 'react'
import Select from 'react-select'
import { useState, useEffect } from 'react'
import data from './wasteList.json'

const WasteSelect = () => {

  const [options, setOptions] = useState([]);
  const [selectedWaste, setSelectedWaste] = useState(null)

  useEffect(() => {
    const formattedData = data.map(item => ({
      value: item.id,
      label: `${item.code} - ${item.name}`
    }));
    setOptions(formattedData);
  }, []);

  const handleChange = (selectedWaste) => {
    setSelectedWaste(selectedWaste) 
    console.log("Selected option:", selectedWaste)
  }
  return (
    <div className='WasteSelectDiv'>
        <Select className='WasteSelect'
          value={selectedWaste}
          onChange={handleChange}
          options={options}
          placeholder="Escriba LER y seleccione un tipo de residuo"
        />
    </div>
  )
}

export default WasteSelect