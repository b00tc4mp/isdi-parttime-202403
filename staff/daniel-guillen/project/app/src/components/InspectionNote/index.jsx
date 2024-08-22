import React from 'react'
import './index.css'

const InspectionNote = ({ inspectionNote, setInspectionNote, workerName, setWorkerName }) => (
    <div className='InspectionNote'>
    
    <div className='Note'>

      <h3>Explicación de la Inspección:</h3>
      
      <textarea
        value={inspectionNote}
        onChange={(e) => setInspectionNote(e.target.value)}
        placeholder='Escribe una breve explicación de la inspección...'
      />

    </div>

    <div className='WorkerInfo'>
    
      <h3>Realizada por:</h3>
    
      <input required
        className='WorkerName'
        type='text'
        value={workerName}
        onChange={(e) => setWorkerName(e.target.value)}
        placeholder='Escribe su nombre...'
      />

    </div>
  </div>
)

export default InspectionNote
