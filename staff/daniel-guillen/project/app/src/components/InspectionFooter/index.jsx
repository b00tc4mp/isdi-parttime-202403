import React from 'react'
import './index.css'
import InspectionNote from '../../components/InspectionNote'
import ItemsToFix from '../../components/ItemsToFix'
import mecanic from '../../components/img/mecanic.png'

const InspectionFooter = ({ checkList, inspectionNote, setInspectionNote, workerName, setWorkerName, saveData, route }) => {
  return (
    <div className='FooterCheckList'>

      {checkList.some(item => item.selectedValue === 'ARREGLAR') && (
        <ItemsToFix items={checkList.filter(item => item.selectedValue === 'ARREGLAR')} />
      )}

      <InspectionNote
        inspectionNote={inspectionNote}
        setInspectionNote={setInspectionNote}
        workerName={workerName}
        setWorkerName={setWorkerName}
      />



      <div className='Button'>
        <div className='MichelangeloMecanic'>
          <button onClick={saveData} className='SubmitButtonInspection' type='submit'>
            ENVIAR <img className='ImageInspection' src={mecanic} alt="Enviar Inspección" />
          </button>
        </div>

        <a className='menu-link' href={route}>HISTORIAL DE INSPECCIONES</a>
      </div>
    </div>
  )
}

export default InspectionFooter