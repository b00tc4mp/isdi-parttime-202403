import React from 'react'
import './index.css'

const WasteWeight = ( { weight, handleWeightChange} ) => {

  return (

      <div className='InputWeightDiv'>
      
        <input required
        className='InputWeight'
        id='InputWeight'
        type='number'
        name='weight'
        placeholder='Peso'
        value={weight}
        min="15"
        max="1499"
        onChange={handleWeightChange}
        />
        
        <h2
        className='UnitWeight'>
        Kg.
        </h2>
      
      </div>

  )
}

export default WasteWeight