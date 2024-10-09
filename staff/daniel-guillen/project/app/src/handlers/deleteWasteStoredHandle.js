import deleteWasteById from '../logic/stored/deleteWaste'
import fetchStoredWaste from '../logic/stored/getWasteStored'

// Función para eliminar residuo por ID
const handleDeleteWaste = async (id, token, setData, setLoading, setError) => {
  const isConfirmed = window.confirm('🗑️ ¿Deseas eliminar este residuo? 📦')

  if (isConfirmed) {
    try {
      await deleteWasteById(id, token)  // pasamos el token al eliminar residuo
      alert('📦 Residuo eliminado exitosamente 🎉')

      // refrescar la lista después de eliminar un residuo
      fetchStoredWaste(token, setData, setLoading, setError)
    } catch (error) {
      console.error('Error eliminando el residuo:', error)
      alert(error.message)
    }
  } else {
    alert('🗑️ Eliminación cancelada ❌')
  }
}

export default handleDeleteWaste