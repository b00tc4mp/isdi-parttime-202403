
import { useState } from 'react'
import VehiclesSelect from './components/VehicleSelect'
import './index.css'
import Inspection from './Inspection'

const Vehicles = () => {

  const [selectedVehicle, setSelectedVehicle] = useState("")

  const handleVehicleChange = (selectedVehicle) => {
    setSelectedVehicle(selectedVehicle)
    console.log("Vehiculo seleccionado:", selectedVehicle)
  }


  return (

    <div className='VehiclesOptions'>
      <h1 className='RouteTitle'>INSPECCIÓN DE VEHÍCULOS</h1>
      <VehiclesSelect selectedVehicle={selectedVehicle} handleVehicleChange={handleVehicleChange} />
      <Inspection selectedVehicle={selectedVehicle} />

    </div>
  )
}

export default Vehicles