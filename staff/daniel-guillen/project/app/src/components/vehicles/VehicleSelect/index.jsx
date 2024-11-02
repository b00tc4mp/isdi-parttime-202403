import './index.css'
import Select from 'react-select'
import { Text } from '../../core'
import { useState, useEffect } from '../../../utils/hooks'
import { vehicleSmall, vehicleMedium, vehicleBig } from '../../img'
import getAllVehicles from '../../../logic/vehicles/getAllVehicles'


const VehiclesSelect = ({ selectedVehicle, handleVehicleChange }) => {
  const [data, setData] = useState([])
  const selectedOption = data.find(option => option.value.id === selectedVehicle?.id)
  const size = selectedVehicle?.size

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

  const getImage = (size) => {
    switch (size) {
      case 'small':
        return vehicleSmall
      case 'medium':
        return vehicleMedium
      case 'big':
        return vehicleBig
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
          <Text>Vehículo seleccionado:</Text>
          {vehicleImg && <img src={vehicleImg} alt={`Imagen de vehículo ${size}`} />}
        </div>
      )}
    </div>
  )
}

export default VehiclesSelect

