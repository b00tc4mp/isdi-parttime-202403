import React, { useState } from 'react'

const StoredSelect = () => {

  const [selectedStored, setSelectedStored] = useState("")

  const handleChange = (event) => {
    const { value } = event.target
    setSelectedStored(value)
    console.log("Selected option:", value)
  }

  return (
        <div className='StoredSelect'>
            <h2 className='StoredTitle'>Residuo acondicionado en:</h2>
                <div className='StoredSelectButton'>
                <button onClick={handleChange} className={`GRG ${selectedStored === 'GRG' ? 'focus' : ''}`} value='GRG' name='stored'>GRG</button>
                <button onClick={handleChange} className={`Palet ${selectedStored === 'Palet' ? 'focus' : ''}`} value='Palet' name='stored'>PALET</button>
                <button onClick={handleChange} className={`BigBag ${selectedStored === 'BigBag' ? 'focus' : ''}`} value='BigBag' name='stored'>BIGBAG</button>
                <button onClick={handleChange} className={`B200 ${selectedStored === 'B200' ? 'focus' : ''}`}  value='B200' name='stored'>B200</button>
                <button onClick={handleChange} className={`B-200 ${selectedStored === 'B-200' ? 'focus' : ''}`} value='B-200' name='stored'>B-200</button>
                </div>
        </div>
  )
}

export default StoredSelect