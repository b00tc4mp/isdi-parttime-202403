import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../utils/config.js'
import useFetchItemsList from './useFetchItemsList.js'

const useDeleteItem = ( collectionName ) => {
  // Usando el nombre de la coleccion dinamicamente
  const { list, setList } = useFetchItemsList(collectionName)

  const deleteWaste = async (id) => {
    const isConfirmed = window.confirm('¿Deseas eliminar este residuo? 🙈')

    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, collectionName, id))
        alert("Residuo eliminado exitosamente 🎉")
        setList(list.filter((item) => item.id !== id))
      } catch (error) {
        console.error("Error eliminando el residuo: ", error)
      }
      // Recargar despues de eliminar
      window.location.reload()
    } else {
      alert("Eliminación cancelada 🙊")
    }
  }

  return { deleteWaste }
}

export default useDeleteItem