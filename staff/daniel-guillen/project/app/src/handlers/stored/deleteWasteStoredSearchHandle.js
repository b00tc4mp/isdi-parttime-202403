import deleteWasteById from '../../logic/stored/deleteWaste'
import fetchStoredWaste from '../../logic/stored/getWasteStoredByCode'

const handleDeleteWaste = async (selectedWaste, month, year, id, token, setData, setLoading, setError, alert) => {
    try {
      await deleteWasteById(id, token)
      alert('📦 Residuo eliminado exitosamente 🎉')

      fetchStoredWaste(selectedWaste, month, year, token, setData, setLoading, setError)
    } catch (error) {
      setError(error.message)
      alert('Error al eliminar residuo: ' + error)
    } 
  }

export default handleDeleteWaste