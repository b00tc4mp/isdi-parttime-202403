import Select from 'react-select'
import React, { useState, useEffect } from 'react'
import data from './wasteList.json'
import './index.css'

const WasteSelect = ({ selectedWaste, handleWasteChange }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const formattedData = data.map((item) => ({
      value: {
        code: item.code,
        description: item.name,
      },
      label: `${item.code} - ${item.name}`
    }));
    setOptions(formattedData)
  }, []);

  const selectedOption = options.find(option => option.value.code === selectedWaste.code);

  return (
    <div className='WasteSelectDiv'>
      <Select
        required
        className='WasteSelect'
        value={selectedOption}
        onChange={(selected) => handleWasteChange(selected.value)}
        options={options}
        placeholder="CODIGO LER"
      />
    </div>
  );
};

export default WasteSelect;
