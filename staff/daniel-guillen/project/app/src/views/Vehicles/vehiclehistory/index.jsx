import '../index.css'
import { useParams, useNavigate } from '../../../utils/hooks.js'
import { useState } from 'react'
import { Button } from '../../../components/core'
import { InspectionList } from '../../../components/vehicles'
import { vehicleSmall, vehicleMedium, vehicleBig } from '../../../components/img'

const VehicleHistory = () => {
  const navigate = useNavigate()
  const { vehicleId } = useParams()
  const [vehicleSize, setVehicleSize] = useState(null)

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

  const vehicleImg = getImage(vehicleSize)

  return (
    <div className='Historical'>
      <div className='VehicleHistorical'>
        <h2 className="VehicleId">Vehículo {vehicleId}:</h2>
        {vehicleImg && <img src={vehicleImg} alt={`Imagen de vehículo ${vehicleSize}`} />}
        <Button className='HistoricalLink' onClick={() => navigate('/vehicles/inspection')}>⬅️Volver a registro</Button>
      </div>

      {/* Renderiza el componente con vehicleId */}
      <InspectionList vehicleId={vehicleId} setVehicleSize={setVehicleSize} />
    </div>
  )
}

export default VehicleHistory