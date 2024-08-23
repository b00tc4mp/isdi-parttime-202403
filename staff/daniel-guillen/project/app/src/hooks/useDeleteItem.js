import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../utils/config.js'
import useFetchItemsList from './useFetchItemsList.js'

const useDeleteItem = (collectionName, refreshData) => {
  const { data: list } = useFetchItemsList(collectionName, refreshData)

  const deleteWaste = async (id) => {
    const isConfirmed = window.confirm('¿Deseas eliminar este residuo? 🙈')

    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, collectionName, id))
        alert("Residuo eliminado exitosamente 🎉")
        
        // Actualizamos la lista utilizando la función de refresco proporcionada.
        refreshData()
      } catch (error) {
        console.error("Error eliminando el residuo: ", error)
      }
    } else {
      alert("Eliminación cancelada 🙊")
    }
  }

  return { deleteWaste }
}

export default useDeleteItem