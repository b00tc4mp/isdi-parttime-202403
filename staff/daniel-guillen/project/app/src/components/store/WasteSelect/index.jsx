import { useState, useEffect } from 'react'
import Select from 'react-select'
import './index.css'
//data
import data from './wasteList.json'


const WasteSelect = ({ selectedWaste, handleWasteChange }) => {
  
  const [options, setOptions] = useState([]) //variable de estado empieza vacia y corresponde al selectedWaste

  useEffect(() => {
    const formattedData = data.map((item) => ({
      value: {
        code: item.code, //value sera un objeto con code (item.code) y description (item.name) 
        description: item.name,
      },
      label: `${item.code} - ${item.name}` //label sera una cadena con item.code y item.name
    }))
    //listo para usar
    setOptions(formattedData)
  }, [])

  // selectedWaste es mismo objeto que la options seleccionada de selecedOption
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
