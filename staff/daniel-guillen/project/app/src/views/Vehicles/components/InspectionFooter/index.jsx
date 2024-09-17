import './index.css'
import InspectionNote from '../InspectionNote'
import ItemsToFix from '../ItemsToFix'
import Button from '../../../../components/core/Button'

const InspectionFooter = ({ checkList, inspectionNote, setInspectionNote, saveData, route }) => {
  return (
    <div className='FooterCheckList'>

      {checkList.some(item => item.selectedValue === 'ARREGLAR') && (
        <ItemsToFix items={checkList.filter(item => item.selectedValue === 'ARREGLAR')} />
      )}

      <InspectionNote
        inspectionNote={inspectionNote}
        setInspectionNote={setInspectionNote}
      />




        
          <Button  className='SubmitButton' type='submit' onClick={saveData}>💾 GUARDAR 🔧</Button>

        <a className='menu-link' href={route}>HISTORIAL DE INSPECCIONES</a>
    </div>
  )
}

export default InspectionFooter