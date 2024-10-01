import { useState, useEffect } from 'react'
import Select from 'react-select'
import './index.css'
// Logic
import getAllVehicles from '../../../logic/getAllVehicles'
// Images
import VehicleSmall from '../../img/VehicleSmall.jpg'
import VehicleMedium from '../../img/VehicleMedium.jpg'
import VehicleBig from '../../img/VehicleBig.jpg'

const VehiclesSelect = ({ selectedVehicle, handleVehicleChange }) => {
  const [data, setData] = useState([])

  // useEffect para cargar las vehiculos
  useEffect(() => {
    const fetchVehiclesData = async () => {
      try {
        const vehiclesData = await getAllVehicles()
        setData(vehiclesData)
      } catch (error) {
        console.error('Error al cargar los datos de vehículos', error)
      }
    }

    fetchVehiclesData()
  }, [])

  // Se mantendra la opcion seleccionada en el label
  const selectedOption = data.find(option => option.value.id === selectedVehicle?.id)

  // Extraer el tamaño del vehículo seleccionado
  const size = selectedVehicle?.size

  // Se mostrara la imagen de vehiculo segun la seleccion
  const getImage = (size) => {
    switch (size) {
      case 'small':
        return VehicleSmall
      case 'medium':
        return VehicleMedium
      case 'big':
        return VehicleBig
      default:
        return null
    }
  }

  const vehicleImg = getImage(size)

  return (
    <div className='VehiclesSelectedDiv'>
      <Select
        className='VehiclesSelected'
        id='VehiclesSelect'
        placeholder="VEHÍCULOS"
        options={data} 
        value={selectedOption} 
        onChange={(selected) => handleVehicleChange(selected ? selected.value : null)}
        isClearable
      />

      {/* se mostrara cuando este seleccionado vehiculo */}
      {selectedVehicle && (
        <div className='vehicle'>
          <h2>Vehículo seleccionado:</h2>
          {vehicleImg && <img src={vehicleImg} alt={`Imagen de vehículo ${size}`} />}
        </div>
      )}
    </div>
  )
}

export default VehiclesSelect

