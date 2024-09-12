import { useState, useEffect } from 'react'
//components
import InspectionFooter from '../components/InspectionFooter'
import InspectionSections from '../components/InspectionSections'
//img
import VehicleSmall from '../../../components/img/VehicleSmall.jpg'
import VehicleMedium from '../../../components/img/VehicleMedium.jpg'
import VehicleBig from '../../../components/img/VehicleBig.jpg'
//data
import small from '../inspectionData/checkListSmall.json'
import medium from '../inspectionData/checkListMedium.json'
import big from '../inspectionData/checkListBig.json'

const Inspection = ({ selectedVehicle }) => {

  const [checkList, setCheckList] = useState([])
  const [inspectionNote, setInspectionNote] = useState('')
  const [workerName, setWorkerName] = useState('')

  // vamos a elegir la data y la imagen de manera dinámica según el tamaño del vehículo
  let data
  let vehicleImg

  switch (selectedVehicle?.size) {
    case 'small':
      data = small
      vehicleImg = VehicleSmall
      break
    case 'medium':
      data = medium
      vehicleImg = VehicleMedium
      break
    case 'big':
      data = big
      vehicleImg = VehicleBig
      break
    default:
      data = []
      vehicleImg = null
  }

  useEffect(() => {
    if (data.length > 0) {  // Solo actualiza si data tiene elementos
      const initializedData = data.map(item => ({ ...item, selectedValue: 'CORRECTO' }))
      setCheckList(initializedData)
    }
  }, [data])
  

  const handleRadioChange = (id, value) => {
    const updatedCheckList = checkList.map(item =>
      item.id === id ? { ...item, selectedValue: value } : item
    )
    setCheckList(updatedCheckList)
  }

  const saveData = () => {
    // Implementación para guardar los datos
  }

  return (
    <div className='container'>
      <div className='vehicle'>
        <h2 className="title">Vehiculo seleccionado:</h2>
        {/* <h3>Vehículo: {selectedVehicle?.model}</h3>
        <h3>Matricula: {selectedVehicle?.id}</h3> */}
        
        {/* Mostrar la imagen según el tamaño del vehículo */}
        {vehicleImg && <img src={vehicleImg} alt={`Imagen de vehículo ${selectedVehicle?.size}`} />}
      </div>

      {/* Renderizar las secciones de inspección */}
      <InspectionSections checkList={checkList} handleRadioChange={handleRadioChange} />

      {/* Pie de página con formulario de notas y nombre */}
      <InspectionFooter
        checkList={checkList}
        inspectionNote={inspectionNote}
        setInspectionNote={setInspectionNote}
        workerName={workerName}
        setWorkerName={setWorkerName}
        saveData={saveData}
        route='/Vehicles/historical'
      />


    </div>
  )
}

export default Inspection
