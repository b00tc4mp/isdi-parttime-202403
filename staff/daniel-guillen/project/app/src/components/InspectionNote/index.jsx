import React from 'react'
import './index.css'
import View from '../core/View'

const InspectionNote = ({ inspectionNote, setInspectionNote, workerName, setWorkerName }) => (
  <View>

    <div className='InspectionNote'>
    
    <div className='Note'>

      <h3>Explicación de la Inspección</h3>
      
      <textarea
        value={inspectionNote}
        onChange={(e) => setInspectionNote(e.target.value)}
        placeholder='Escribe una breve explicación de la inspección...'
      />

    </div>

    <div className='WorkerInfo'>
    
      <p>Realizada por:</p>
    
      <input required
        className='WorkerName'
        type='text'
        value={workerName}
        onChange={(e) => setWorkerName(e.target.value)}
        placeholder='Escribe su nombre...'
      />
    
    </div>
  </div>

  </View>
)

export default InspectionNote
