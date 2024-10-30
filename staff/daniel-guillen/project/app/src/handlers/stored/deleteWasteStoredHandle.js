import deleteWasteById from '../../logic/stored/deleteWaste'
import fetchStoredWaste from '../../logic/stored/getWasteStored'

const handleDeleteWaste = async (id, month, year, token, setData, setLoading, setError, alert) => {
    try {
      await deleteWasteById(id, token)
      alert('📦 Residuo eliminado exitosamente 🎉')

      fetchStoredWaste(month, year, token, setData, setLoading, setError)
    } catch (error) {
      setError(error.message)
      alert('Error al eliminar residuo: ' + error)
    } 
}

export default handleDeleteWaste