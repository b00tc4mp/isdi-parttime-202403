import '../index.css'
import { useState, useNavigate, useCustomContext } from '../../../utils/hooks.js'
import { Button, Title } from '../../../components/core'
import { VehicleSelect, InspectionFooter, InspectionSections} from '../../../components/vehicles/index.js'
import { handleVehicleChange, handleRadioChange, saveData } from '../../../handlers/vehicles/registerVehicleInspectionHandlers'

const VehicleInspection = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token') 
  const { alert } = useCustomContext()
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [checkList, setCheckList] = useState([])
  const [inspectionNote, setInspectionNote] = useState('')
  const { id, model, size } = selectedVehicle || {}

  return (
    <div className='VehicleInspection'>
      <Title>INSPECCIÓN DE VEHÍCULOS</Title>
      
      <VehicleSelect selectedVehicle={selectedVehicle} handleVehicleChange={(vehicle) => handleVehicleChange(vehicle, setSelectedVehicle)} />
      
      {!selectedVehicle ? (
        <h2 style={{ color: 'green' }}>Seleccione un vehículo...</h2>
      ) : (
        <><Button className='HistoricalLink' onClick={() => navigate(`/Vehicles/historical/${id}`)}>Historial de {model}📅</Button>

        <InspectionSections size={size} checkList={checkList} setCheckList={setCheckList}
          handleRadioChange={(id, value) => handleRadioChange(id, value, checkList, setCheckList)} />
        
        <InspectionFooter checkList={checkList} inspectionNote={inspectionNote} setInspectionNote={setInspectionNote}
          saveData={() => saveData(selectedVehicle, checkList, inspectionNote, token, navigate, alert)}
        /></>
      )}
    </div>
  )
}

export default VehicleInspection