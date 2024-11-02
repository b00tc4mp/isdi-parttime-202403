import './index.css'
import { useState, useEffect } from 'react'
import { useCustomContext } from '../../../context/useContext.js'
import { Button, Text } from '../../core'
import { sortInspections, getMonthName } from '../../../utils/inspectionUtils'
import fetchInspectionsById from '../../../logic/vehicles/getInspectionsById'
import handleDeleteInspection from '../../../handlers/vehicles/deleteInspectionHandle.js'

const InspectionList = ({ vehicleId, setVehicleSize }) => {
  const token = sessionStorage.getItem('token')
  const { alert, confirm } = useCustomContext()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (vehicleId) {
      setError(null)
      setLoading(true)
      fetchInspectionsById(vehicleId, token)
        .then((inspections) => {
          const sortedInspections = sortInspections(inspections)
          setData(sortedInspections)
          setVehicleSize(sortedInspections[0]?.vehicle?.size)
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false))
    } else {
      setData([])
      setError(null)
      setLoading(false)
    }
  }, [vehicleId, setVehicleSize, token])

  const handleDelete = (id) => { 
    confirm({
      message: '🗑️ ¿Deseas eliminar esta Inspección? 🔧',
      onAccept: () => handleDeleteInspection(id, token, vehicleId, setData, setLoading, setError, alert),
      onCancel: () => alert('🗑️ Eliminación cancelada ❌'),
    })
  }

  return (
    <div className='Historical'>
      {loading ? (
        <Text className="Loading">Cargando inspecciones guardadas...</Text>
      ) : error ? (
        <Text className="Error">Error al cargar los datos: {error}</Text>
      ) : data.length === 0 ? (
        <Text className="Empty">No se encontraron inspecciones para este vehículo.</Text>
      ) : (
        data.map((item) => (
          <div className='HistoricalList' key={item.id}>
            <Button className="deleteInspection" onClick={() => handleDelete(item.id)}>
              <div className='Inspection'>
                <div className='HistoricalInfo'>
                  <Text className='bold'>Realizado por: {item.worker.workerName}</Text>
                  <Text>Mes de inspección: {getMonthName(item.worker.month)}</Text>
                </div>        
                <div className='HistorialItemToFix'>
                  <Text className='bold'>Elementos para arreglar:</Text>
                  <ul className='itemFix'>
                    {item.inspection.itemFix.map((fix, index) => (
                      <li key={index}>
                        {fix.Apartado}: {fix.Elemento}
                      </li>
                    ))}
                  </ul>
                </div>
                <Text className='TitlelInfo'><strong>Explicación de la Inspección:</strong></Text>
                <Text className='HistoricalNote'>{item.inspection.notes}</Text>
              </div>
            </Button>
          </div>
        ))
      )}
    </div>
  )
}

export default InspectionList