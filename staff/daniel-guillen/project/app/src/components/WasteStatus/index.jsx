import React from 'react'
import './index.css'
//components
import View from '../core/View'

const WasteStatus = ( { statusOptions, handleStatusOptions }) => {

  return (
    <View>
    <div className="StatusDiv">
      <div className={`WasteStatus ${statusOptions}`}>

        <div className='StatusTitle'><p>Estado del Residuo</p></div>
        
        <div className="StatusOptions">
        
          <input className='Radio'
            type="radio"
            id="CORRECTO"
            name="statusWaste"
            value="CORRECTO"
            checked={statusOptions === "CORRECTO"}
            onChange={handleStatusOptions}
          />
            <label htmlFor="CORRECTO">👍</label>

          <input className='Radio'
            type="radio"
            id="ESTANCADO"
            name="statusWaste"
            value="ESTANCADO"
            checked={statusOptions === "ESTANCADO"}
            onChange={handleStatusOptions}
          />
            <label htmlFor="ESTANCADO">👎</label>

        </div>
          <p>
          ESTADO <strong>{statusOptions}</strong>
          </p>
      </div>
    </div>
    </View>
  )
}

export default WasteStatus

