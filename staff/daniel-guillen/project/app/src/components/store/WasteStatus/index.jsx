import './index.css'

const WasteStatus = ( { statusOptions, handleStatusOptions }) => {

  return (

    <div className="StatusDiv">
      <div className={`WasteStatus ${statusOptions}`}>

        <div className='StatusTitle'><p>Estado del Residuo</p></div>
        
        <div className="StatusOptions">
        
          <input className='radio'
            type="radio"
            id="CORRECTO"
            name="statusWaste"
            value="CORRECTO"
            checked={statusOptions === "CORRECTO"}
            onChange={handleStatusOptions}
          />
            <label htmlFor="CORRECTO">👍</label>

          <input className='radio'
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

  )
}

export default WasteStatus

