import { useState } from 'react'

const useDeleteWaste = (refreshData) => {
  const [error, setError] = useState(null)

  const deleteWaste = async (id) => {
    const isConfirmed = window.confirm('¿Deseas eliminar este residuo? 🙈')

    if (isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/stored/deleteWaste/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Error al eliminar el residuo')
        }

        // Muestra un mensaje de éxito
        alert('Residuo eliminado exitosamente 🎉')
        
        // Actualizamos la lista utilizando la función de refresco proporcionada.
        refreshData()
      } catch (error) {
        console.error('Error eliminando el residuo:', error)
        setError('Error eliminando el residuo. Inténtalo de nuevo más tarde.')
        alert('Error eliminando el residuo. Inténtalo de nuevo más tarde.')
      }
    } else {
      alert('Eliminación cancelada 🙊')
    }
  }

  return { deleteWaste, error }
}

export default useDeleteWaste
