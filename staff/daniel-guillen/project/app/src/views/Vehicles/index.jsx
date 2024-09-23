import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import VehiclesSelect from './components/VehicleSelect'
import InspectionFooter from './components/InspectionFooter'
import InspectionSections from './components/InspectionSections'
// Logic
import getUserName from '../../logic/getUserName'
import createInspection from '../../logic/createInspection'
// Data
import small from './inspectionData/checkListSmall.json'
import medium from './inspectionData/checkListMedium.json'
import big from './inspectionData/checkListBig.json'
// Validation
import { validateInspectionData, filterItemsToFix } from 'com/validate/validateInspectionData'
import './index.css'

const Vehicles = () => {
  const navigate = useNavigate()
  const [token] = useState(sessionStorage.getItem('token'))

  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [checkList, setCheckList] = useState([])
  const [inspectionNote, setInspectionNote] = useState('')
  const [workerName, setWorkerName] = useState('')

  // obtener el nombre del usuario
  useEffect(() => {
    const fetchAndSetUserName = async () => {
      try {
        const userName = await getUserName(token)
        setWorkerName(userName)
      } catch (error) {
        console.error('Error al obtener el nombre de usuario:', error)
        alert('Error al obtener el nombre de usuario')
      }
    }

    if (token) fetchAndSetUserName()
  }, [token])

  // handle vehiculo seleccionado
  const handleVehicleChange = (selectedVehicle) => {
    setSelectedVehicle(selectedVehicle)
    console.log("Vehículo seleccionado:", selectedVehicle)
  }

  const { id, model, size } = selectedVehicle || {}

  // cargar checklist segun el tamaño del vehículo
  const getData = (size) => {
    switch (size) {
      case 'small':
        return { data: small }
      case 'medium':
        return { data: medium }
      case 'big':
        return { data: big }
      default:
        return { data: [] }
    }
  }

  const { data } = getData(size)

  // renderizamos checklist
  useEffect(() => {
    if (data.length > 0) {
      const initializedData = data.map(item => ({ ...item, selectedValue: 'CORRECTO' }))
      setCheckList(initializedData)
    }
  }, [data])

  // valores de checklist
  const handleRadioChange = (id, value) => {
    const updatedCheckList = checkList.map(item =>
      item.id === id ? { ...item, selectedValue: value } : item
    )
    setCheckList(updatedCheckList)
  }

  // guardar la inspección
  const saveData = async () => {
    try {
      const today = new Date()
      const date = today.toISOString()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const year = String(today.getFullYear())
  
      // validaciones
      if (!validateInspectionData(workerName, selectedVehicle, checkList, inspectionNote)) return
  
      // filtrar los elementos que han sido marcados como "ARREGLAR"
      const itemFix = filterItemsToFix(checkList)
      if (!itemFix) return
  
      // estructura de datos guardados
      const newInspection = {
        vehicle: { id, model, size },
        inspection: { itemFix, notes: inspectionNote },
        worker: { workerName, month, year }
      }
  
      const result = await createInspection(newInspection, token)
  
      if (result) {
        alert(`Inspección registrada: ${workerName} - ${model} - ${date} 🎉`)
        // navigate dinamico con matricula
        navigate(`/Vehicles/historical/${id}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al registrar la inspección')
    }
  }

  return (
    <div className='VehiclesOptions'>
      <h1 className='RouteTitle'>INSPECCIÓN DE VEHÍCULOS</h1>
      
      <VehiclesSelect selectedVehicle={selectedVehicle} handleVehicleChange={handleVehicleChange} />
      
      {/* se mostrara cuando este seleccionado vehiculo */}
      {!selectedVehicle ? (
        <h2 style={{ color: 'green' }}>Seleccione un vehículo...</h2>
      ) : (
        <>
        <a className='menu-link' href={`/Vehicles/historical/${id}`}>HISTORIAL DE INSPECCIONES</a>
          <InspectionSections checkList={checkList} handleRadioChange={handleRadioChange} />
          <InspectionFooter
            checkList={checkList}
            inspectionNote={inspectionNote}
            setInspectionNote={setInspectionNote}
            saveData={saveData}
          />
        </>
      )}
    </div>
  )
}

export default Vehicles