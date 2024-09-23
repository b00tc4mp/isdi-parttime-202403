import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../index.css'
// Images
import VehicleSmall from '../../../components/img/VehicleSmall.jpg'
import VehicleMedium from '../../../components/img/VehicleMedium.jpg'
import VehicleBig from '../../../components/img/VehicleBig.jpg'
// Logic
import fetchInspectionsById from '../../../logic/getInspectionsById'
// Handlers
import handleDeleteInspection from '../../../handlers/deleteInspectionHandle'

const Historical = () => {
  const token = sessionStorage.getItem('token') // obtener el token de sessionStorage
  const { vehicleId } = useParams() // esta info viene desde el registro

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [vehicleSize, setVehicleSize] = useState(null) // tamaño vehiculo

  // seleccionar imagen segun el tamaño del vehículo
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

  // renderizar inspecciones y tamaño del vehiculo
  useEffect(() => {
    if (vehicleId) {
      setError(null)
        setLoading(true)
      fetchInspectionsById(vehicleId, token)// solicitud a sercidor
        .then((inspections) => {
          //ordenamos por fecha
          const sortedInspections = inspections.sort((a, b) => new Date(b.worker.date) - new Date(a.worker.date))
          setData(sortedInspections)
          setVehicleSize(sortedInspections[0].vehicle.size) // tamaño del vehículo
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false))
    } else {
      setData([])
      setError(null)
      setLoading(false)
    }
  }, [vehicleId, token])

  const vehicleImg = getImage(vehicleSize) // Obtener imagen basada en el tamaño del vehículo

  return (
    <div>
      {loading ? (
        <p style={{ color: 'orange', textAlign: 'center' }}>Cargando inspecciones guardadas...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
      ) : data.length === 0 ? (
        <p style={{ color: 'white', textAlign: 'center' }}>No se encontraron inspecciones para este vehículo.</p>
      ) : (
        <>
          <div className='vehicle'>
            <h2 className="title">Vehículo {vehicleId}:</h2>
            {vehicleImg && <img src={vehicleImg} alt={`Imagen de vehículo ${vehicleSize}`} />}
          </div>

          {data.map((item) => (
            <div key={item.id} className='list'>
             <button
                className="deleteInspection"
                onClick={() => handleDeleteInspection(item.id, token, vehicleId, setData, setLoading, setError)}
              >
                <div className='Inspection'>
                  <p>{item.worker.workerName} - {item.worker.date}</p>
                  <p>{item.vehicle.model} - {item.vehicle.id}</p>
                  <ul className='itemFix'>
                    {item.inspection.itemFix.map((fix, index) => (
                      <li key={index}>
                        {fix.Apartado}: {fix.Elemento}
                      </li>
                    ))}
                  </ul>
                  <p className='notes'>{item.inspection.notes}</p>
                </div>
              </button>
            </div>
          ))}
        </>
      )}
      <a className='menu-link' href={'/Vehicles'}>VOLVER A REGISTRO</a>
    </div>
  )
}

export default Historical