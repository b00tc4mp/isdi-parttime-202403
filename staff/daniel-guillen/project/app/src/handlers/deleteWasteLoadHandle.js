import deleteLoadById from '../logic/departures/deleteLoad.js'
import fetchLoadWaste from '../logic/departures/getWasteLoad.js'

const handleDeleteWaste = async (id, token, week, year, reference, setData, setLoading, setError) => {
  const isConfirmed = window.confirm('🗑️ ¿Deseas eliminar carga seleccionada? 📦')

  if (isConfirmed) {
    try {
      await deleteLoadById(id, token)  // pasamos el token al eliminar carga
      alert('📦 Carga eliminada exitosamente 🎉')

      // refrescar la lista después de eliminar una carga
      fetchLoadWaste(week, year, reference, token, setData, setLoading, setError)
    } catch (error) {
      console.error('Error al eliminar carga:', error)
      alert(error.message)
    }
  } else {
    alert('🗑️ Eliminación cancelada ❌')
  }
}

export default handleDeleteWaste
