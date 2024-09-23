import deleteInspectionById from '../logic/deleteInspection'
import fetchInspectionsById from '../logic/getInspectionsById'

// funcion para eliminar residuo por ID
const handleDeleteInspection = async (id, token, vehicleId, setData, setLoading, setError) => {
  const isConfirmed = window.confirm('🗑️ ¿Deseas eliminar esta inspección? 🔧')

  if (isConfirmed) {
    try {
      await deleteInspectionById(id, token)
      alert('🔧 Inspección eliminada exitosamente 🎉')

      // Refrescar la lista después de eliminar una inspección
      const updatedInspections = await fetchInspectionsById(vehicleId, token)
      setData(updatedInspections) // Actualizamos la lista de inspecciones
    } catch (error) {
      console.error('Error eliminando inspección:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  } else {
    alert('🗑️ Eliminación cancelada ❌')
  }
}

export default handleDeleteInspection