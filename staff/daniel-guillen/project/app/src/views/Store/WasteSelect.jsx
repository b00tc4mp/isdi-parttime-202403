import React from 'react'
import Select from 'react-select'
import { useState, useEffect } from 'react'
import data from './wasteList.json'

const WasteSelect = () => {

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const formattedData = data.map(item => ({
      value: item.id,
      label: `${item.code} - ${item.name}`
    }));
    setOptions(formattedData);
  }, []);

  return (
    <div>
        <Select
          options={options}
        placeholder="Selecciona un tipo de residuo"
        />
        <hr></hr>
    </div>
  )
}

export default WasteSelect