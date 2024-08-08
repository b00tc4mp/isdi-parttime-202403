import './index.css'
import React from 'react'
const WasteStatus = ( { statusOptions, handleStatusOptions }) => {

  return (
    <div className="StatusDiv">
      <div className={`WasteStatus ${statusOptions}`}>
        <div className='StatusTitle'><p>Estado del Residuo</p></div>
        <div className="StatusOptions">
        <input className='Radio'
          type="radio"
          name="statusWaste"
          value="CORRECTO"
          id="CORRECTO"
          checked={statusOptions === "CORRECTO"}
          onChange={handleStatusOptions}
        />
        <label htmlFor="CORRECTO">👍</label>

        <input className='Radio'
          type="radio"
          name="statusWaste"
          value="ESTANCADO"
          id="ESTANCADO"
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
  )
}

export default WasteStatus

