import React, { useState, useEffect } from 'react'
//components
import CheckList from '../../../components/CheckList'
import ItemsToFix from '../../../components/ItemsToFix'
import InspectionNote from '../../../components/InspectionNote'
import mecanic from '../../../components/img/mecanic.png'
//hooks
import useSubmitCheck from '../../../hooks/useSubmitChek'
//data
import data from '../inspectionData/checkListVan.json'

const Van1 = () => {
  const [checkList, setCheckList] = useState([])
  const [inspectionNote, setInspectionNote] = useState('')
  const [workerName, setWorkerName] = useState('')

  const { saveData } = useSubmitCheck('dataCheckVan1', checkList, inspectionNote, workerName, '/Fleet/Van1/historical')

  useEffect(() => {
    const initializedData = data.map(item => ({ ...item, selectedValue: 'CORRECTO' }))
    setCheckList(initializedData)
  }, [])

  const handleRadioChange = (id, value) => {
    const updatedCheckList = checkList.map(item =>
      item.id === id ? { ...item, selectedValue: value } : item
    )
    setCheckList(updatedCheckList)
  }

  const sections = [
    { title: 'LUCES', items: checkList.filter(item => item.apartado === 'LUCES') },
    { title: 'CHASIS / CARROCERÍA', items: checkList.filter(item => item.apartado === 'CHASIS' || item.apartado === 'CARROCERÍA') },
    { title: 'MOTOR', items: checkList.filter(item => item.apartado === 'MOTOR') },
    { title: 'NEUMÁTICOS', items: checkList.filter(item => item.apartado === 'NEUMÁTICOS') },
    { title: 'FRENOS / DIRECCIÓN', items: checkList.filter(item => item.apartado === 'FRENOS' || item.apartado === 'DIRECCIÓN') },
    { title: 'ACCESORIOS', items: checkList.filter(item => item.apartado === 'ACCESORIOS') },
    { title: 'MATERIAL', items: checkList.filter(item => item.apartado === 'MATERIAL') },
    { title: 'ADR', items: checkList.filter(item => item.apartado === 'ADR') },
    { title: 'EPIS', items: checkList.filter(item => item.apartado === 'EPIS') },
  ]

  return (

      <div className='container'>

      <h1 className='RouteTitle'>INSPECCIÓN FURGÓN 1</h1>

        {sections.map(section => (
          <CheckList
            key={section.title}
            title={section.title}
            items={section.items}
            handleRadioChange={handleRadioChange}
          />
        ))}

        
        {checkList.some(item => item.selectedValue === 'ARREGLAR') && (
          <ItemsToFix items={checkList.filter(item => item.selectedValue === 'ARREGLAR')} />
        )}

        <div className='FooterCheckList'>

        <InspectionNote
          inspectionNote={inspectionNote}
          setInspectionNote={setInspectionNote}
          workerName={workerName}
          setWorkerName={setWorkerName}
        />
        
        <div className='Button'>
        
        <button onClick={saveData} className='SubmitButtonInspection' type='submit'>
          ENVIAR <img className='ImageInspection' src={mecanic} alt="Enviar Inspección" />
          </button>
        
        <a className='menu-link' href="/Fleet/Van1/historical">HISTORIAL DE INSPECCIONES</a>  
        
        </div>
           
        </div>

      </div>

  )
}

export default Van1