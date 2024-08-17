import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'

const deleteItem = (collectionName, list = [], setList) => {
  const deleteWaste = async (id) => {
    const isConfirmed = window.confirm('¿Deseas eliminar este residuo? 🙈')

    if (isConfirmed) {
      try {
        // Usando el nombre de la coleccion dinamicamente
        await deleteDoc(doc(db, collectionName, id))
        alert("Residuo eliminado con éxito 🎉")

        
        if (Array.isArray(list) && typeof setList === 'function') {
          setList(list.filter((item) => item.id !== id))
        } else {
          console.error("List is not an array or setList is not a function")
        }
      // Recargar despues de eliminar
        window.location.reload()  
      } catch (error) {
        console.error("Error eliminando el residuo: ", error)
      }
    } else {
      alert("Eliminación cancelada 🙊")
    }
  }

  return { deleteWaste }
}

export default deleteItem