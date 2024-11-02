import { Text } from "../../core"

const InspectionNote = ({ inspectionNote, setInspectionNote }) => (
    <div className='InspectionNote'>

      <Text className="bold">Explicación de la Inspección:</Text>
      
      <textarea
        value={inspectionNote}
        onChange={(e) => setInspectionNote(e.target.value)}
        placeholder='Escriba una breve explicación de la inspección...'
      />

  </div>
)

export default InspectionNote
