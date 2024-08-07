import Select from 'react-select'
import React, { useState, useEffect } from 'react'
import data from './wasteList.json'
import './index.css'

const WasteSelect = ({ selectedWaste, handleWasteChange }) => {

  const [options, setOptions] = useState([])

  useEffect(() => {
    const formattedData = data.map(item => ({
      value: item.code,
      label: `${item.code} - ${item.name}`
    }))
    setOptions(formattedData);
  }, [])

  const selectedOption = options.find(option => option.value === selectedWaste)

  return (
    <div className='WasteSelectDiv'>
        <Select
          className='WasteSelect'
          value={selectedOption}
          onChange={(selected) => handleWasteChange(selected.value)}
          options={options}
          placeholder="Escriba LER y seleccione un tipo de residuo"
        />
    </div>
  )
}

export default WasteSelect