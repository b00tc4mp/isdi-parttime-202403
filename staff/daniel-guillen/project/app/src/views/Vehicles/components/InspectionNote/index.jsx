import './index.css'

const InspectionNote = ({ inspectionNote, setInspectionNote }) => (
    <div className='InspectionNote'>
    
    <div className='Note'>

      <h3>Explicación de la Inspección:</h3>
      
      <textarea
        value={inspectionNote}
        onChange={(e) => setInspectionNote(e.target.value)}
        placeholder='Escribe una breve explicación de la inspección...'
      />

    </div>
  </div>
)

export default InspectionNote
