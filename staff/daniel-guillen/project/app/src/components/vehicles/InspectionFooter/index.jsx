import './index.css'
// components
import InspectionNote from '../InspectionNote'
import ItemsToFix from '../ItemsToFix'
import Button from '../../core/Button'

const InspectionFooter = ({ checkList, inspectionNote, setInspectionNote, saveData }) => {
  return (
    <div className='FooterCheckList'>

      {checkList.some(item => item.selectedValue === 'ARREGLAR') && (
        <ItemsToFix items={checkList.filter(item => item.selectedValue === 'ARREGLAR')} />
      )}

      <InspectionNote inspectionNote={inspectionNote} setInspectionNote={setInspectionNote}/>        
      <Button  className='SubmitInspection' type='submit' onClick={saveData}>💾 GUARDAR 🔧</Button>

    </div>
  )
}

export default InspectionFooter