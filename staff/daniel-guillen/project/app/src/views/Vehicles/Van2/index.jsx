import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//components
import InspectionFooter from '../components/InspectionFooter'
import InspectionSections  from '../components/InspectionSections'
//hooks
import useSubmitCheck from '../../../hooks/useSubmitChek'
//data
import data from '../inspectionData/checkListVan.json'

const Van2 = () => {
  const [checkList, setCheckList] = useState([])
  const [inspectionNote, setInspectionNote] = useState('')
  const [workerName, setWorkerName] = useState('')

  const navigate = useNavigate()
  const { saveData } = useSubmitCheck('dataCheckVan2', checkList, inspectionNote, workerName, '/Vehicles/Van2/historical', navigate)
  
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
  return (

<div className='container'>
      <h1 className='RouteTitle'>INSPECCIÓN FURGÓN 2</h1>

      <InspectionSections checkList={checkList} handleRadioChange={handleRadioChange} />

      <InspectionFooter
        checkList={checkList}
        inspectionNote={inspectionNote}
        setInspectionNote={setInspectionNote}
        workerName={workerName}
        setWorkerName={setWorkerName}
        saveData={saveData}
        route='/Vehicles/Van2/historical'
      />
    </div>
  )
}

export default Van2