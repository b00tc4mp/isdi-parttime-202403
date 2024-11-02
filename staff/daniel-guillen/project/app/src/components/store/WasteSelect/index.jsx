import './index.css'
import Select from 'react-select'
import data from './wasteList.json'
import { useState, useEffect } from 'react'


const WasteSelect = ({ selectedWaste, handleWasteChange }) => {
  
  const [options, setOptions] = useState([])

  useEffect(() => {
    const formattedData = data.map((item) => ({
      value: {
        code: item.code,
        description: item.name,
      },
      label: `${item.code} - ${item.name}`
    }))
    setOptions(formattedData)
  }, [])

  const selectedOption = options.find(option => option.value.code === selectedWaste.code)
  return (

      <div className='WasteSelectDiv'>
        <Select required
          className='WasteSelect'
          id='WasteSelect'
          placeholder="CODIGO DE RESIDUO"
          options={options}
          value={selectedOption}
          onChange={(selected) => handleWasteChange(selected.value)}
        />
      </div>

  )
}

export default WasteSelect;
