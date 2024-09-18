import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import VehiclesSelect from './components/VehicleSelect'
import InspectionFooter from './components/InspectionFooter'
import InspectionSections from './components/InspectionSections'
// Logic
import getUserName from '../../logic/getUserName'
// Data
import small from './inspectionData/checkListSmall.json'
import medium from './inspectionData/checkListMedium.json'
import big from './inspectionData/checkListBig.json'

import './index.css'

const Vehicles = () => {
  const navigate = useNavigate()

  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [checkList, setCheckList] = useState([]) 
  const [inspectionNote, setInspectionNote] = useState('') 
  const [workerName, setWorkerName] = useState('') 

  const [token] = useState(sessionStorage.getItem('token'))

  // vehículo seleccionado
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

  useEffect(() => {
    if (data.length > 0) {
      const initializedData = data.map(item => ({ ...item, selectedValue: 'CORRECTO' }))
      setCheckList(initializedData)
    }
  }, [data])

  // obtener el nombre del usuario
  useEffect(() => {
    const fetchAndSetUserName = async () => {
      try {
        const userName = await getUserName(token)
        setWorkerName(userName)
      } catch (err) {
        console.error('Error al obtener el nombre de usuario:', err)
        alert('Error al obtener el nombre de usuario')
      }
    }

    if (token) fetchAndSetUserName()
  }, [token])

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
      if (!workerName) return alert('Error: El nombre del trabajador no está disponible.')
      if (!id || !model || !size) return alert('Error: Los campos "id", "model" y "size" son obligatorios.')
      if (!Array.isArray(checkList) || checkList.length === 0) return alert('Error: El campo "itemFix" es requerido.')
      if (!inspectionNote) return alert('Error: El campo "notes" es requerido.')
  
      const today = new Date()
      const date = today.toISOString()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const year = String(today.getFullYear())
  
      // Filtrar los elementos que han sido seleccionados como "ARREGLAR"
      const itemFix = checkList
        .filter(item => item.selectedValue === 'ARREGLAR') // Filtrar los que tienen "ARREGLAR"
        .map(item => ({ Apartado: item.apartado, Elemento: item.elemento })) 
  
      if (itemFix.length === 0) return alert('No hay elementos seleccionados como "ARREGLAR".')
  
      const newInspection = {
        vehicle: { id, model, size },
        inspection: { itemFix, notes: inspectionNote }, // Usamos el array filtrado itemFix
        worker: { workerName, month, year }
      }
  
      const response = await fetch('http://localhost:5000/vehicles/createInspection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newInspection) // Asegúrate de que los datos estén en formato JSON
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error al registrar la inspección:', errorData.message)
        alert('Error al registrar la inspección: ' + errorData.message)
        return
      }
  
      const result = await response.json()
      alert(`Inspección registrada: ${model} - ${workerName} - ${date} 🎉`)
      navigate('/Vehicles/historical')
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
          <InspectionSections checkList={checkList} handleRadioChange={handleRadioChange} />
          <InspectionFooter
            checkList={checkList}
            inspectionNote={inspectionNote}
            setInspectionNote={setInspectionNote}
            saveData={saveData}
          />
        </>
      )}
      <a className='menu-link' href={'/Vehicles/historical'}>HISTORIAL DE INSPECCIONES</a>
    </div>
  )
}

export default Vehicles
