import deleteLoadById from '../../logic/departures/deleteLoad.js'
import fetchLoadWaste from '../../logic/departures/getWasteLoad.js'

const handleDeleteWaste = async (id, token, week, year, reference, setData, setLoading, setError, alert) => {
    try {
      await deleteLoadById(id, token)
      alert('📦 Carga eliminada exitosamente 🎉')

      fetchLoadWaste(week, year, reference, token, setData, setLoading, setError)
    } catch (error) {
      setError(error.message)
      alert('Error al eliminar carga:' + error)
    }
  }

export default handleDeleteWaste