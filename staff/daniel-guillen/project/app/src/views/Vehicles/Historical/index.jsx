import { useState, useEffect } from 'react'
import '../index.css'
// Components
import VehiclesSelect from '../components/VehicleSelect'

const Historical = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Vehículo seleccionado
  const handleVehicleChange = (selectedVehicle) => {
    setSelectedVehicle(selectedVehicle)
    console.log("Vehículo seleccionado:", selectedVehicle)
  }

  const { id } = selectedVehicle || {}

  // Función para traer las inspecciones cargadas
  const fetchInspections = async (id) => {
    try {
      setLoading(true)
      
      // Agregar referencia dinámica a la URL
      const response = await fetch(`${import.meta.env.VITE_API_URL}vehicles/getInspectionById/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener las inspecciones almacenadas')
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Usar `useEffect` para traer las inspecciones cuando se seleccione un vehículo
  useEffect(() => {
    if (id) {  
      fetchInspections(id)
    }
  }, [id])

  // Cargando...
  if (loading) {
    return <p style={{ color: 'green', textAlign: 'center' }}>Cargando datos de inspecciones guardadas...</p>
  }

  // Mensaje de error
  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
  }

  // Eliminar inspección por ID
  const deleteInspection = async (inspectionId) => {
    const isConfirmed = window.confirm('🗑️ ¿Deseas eliminar esta inspección? 🔧')

    if (isConfirmed) {
      try {
        const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}vehicles/deleteInspection/${inspectionId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!apiResponse.ok) {
          throw new Error('Error al eliminar la inspección')
        }

        // Mensaje de éxito
        alert('Inspección eliminada exitosamente 🎉')

        // Refrescar la lista después de eliminar una inspección
        fetchInspections(id)
      } catch (error) {
        console.error('Error al eliminar inspección:', error)
        setError('Error al eliminar inspección. Inténtalo de nuevo más tarde.')
        alert('Error al eliminar inspección. Inténtalo de nuevo más tarde.')
      }
    } else {
      alert('Eliminación cancelada ❌')
    }
  }

  return (
    <div>
      <VehiclesSelect selectedVehicle={selectedVehicle} handleVehicleChange={handleVehicleChange} />

      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id} className='list'>
            <button
              className="deleteInspection"
              onClick={() => deleteInspection(item.id)}
            >
              <div className='Inspection'>
                <p>{item.worker.workerName} - {item.worker.date}</p>
                <p>{item.vehicle.model} - {item.vehicle.id}</p>
                <p className='itemFix'>{item.inspection.itemFix.map(fix => `${fix.Apartado}: ${fix.Elemento}`).join(', ')}</p>
                <p className='notes'>{item.inspection.notes}</p>
              </div>
            </button>
          </div>
        ))
      ) : (
        <p style={{ color: 'white', textAlign: 'center' }}>No hay datos disponibles</p>
      )}
    </div>
  )
}

export default Historical
