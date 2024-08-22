import React, { useState, useEffect } from 'react'
//components
import View from '../../../components/core/View'
import CheckList from '../../../components/CheckList'
import ItemsToFix from '../../../components/ItemsToFix'
import InspectionNote from '../../../components/InspectionNote'
import michelangelo64 from '../../../components/img/michelangelo64.png'
//hooks
import useSubmitCheck from '../../../hooks/useSubmitChek'
//data
import data from '../inspectionData/checkListVan.json'

const Van2 = () => {
  const [checkList, setCheckList] = useState([])
  const [inspectionNote, setInspectionNote] = useState('')
  const [workerName, setWorkerName] = useState('')

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

  const { saveData } = useSubmitCheck('dataCheckVan1', checkList, inspectionNote, workerName)

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
    <View>
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
        
          <button onClick={saveData} className='SubmitButton' type='submit'>
            <img className='SubmitButtonImage' src={michelangelo64} alt="Enviar Inspección" />
          </button>
        
          <a className='menu-link' href="/Fleet/Van1/historical">HISTORIAL</a>
        
        </div>
        
        </div>

      </div>
    </View>
  )
}

export default Van2