import deleteInspectionById from '../../logic/vehicles/deleteInspection'
import fetchInspectionsById from '../../logic/vehicles/getInspectionsById'

const handleDeleteInspection = async (id, token, vehicleId, setData, setLoading, setError, alert) => {
  try {
    await deleteInspectionById(id, token)
    alert('🔧 Inspección eliminada exitosamente 🎉')

    const updatedInspections = await fetchInspectionsById(vehicleId, token)
    setData(updatedInspections)
  } catch (error) {
    setError(error.message)
    alert('Error eliminando inspección: ' + error)
  } finally {
    setLoading(false)
  }
}

export default handleDeleteInspection