const InspectionNote = ({ inspectionNote, setInspectionNote }) => (
    <div className='InspectionNote'>

      <h3>Explicación de la Inspección:</h3>
      
      <textarea
        value={inspectionNote}
        onChange={(e) => setInspectionNote(e.target.value)}
        placeholder='Escriba una breve explicación de la inspección...'
      />

  </div>
)

export default InspectionNote
