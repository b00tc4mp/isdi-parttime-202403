import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config'

const useDeleteTruck3 = (list, setList) => {
  const deleteWaste = async (id) => {
    const isConfirmed = window.confirm('¿Deseas eliminar este residuo? 🙈')

    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, 'dataTruck3Load', id))
        alert("Residuo eliminado exitosamente 🎉")
        setList(list.filter((item) => item.id !== id)) // Update list
      } catch (error) {
        console.error("Error eliminando el residuo: ", error)
      }
    } else {
      alert("Eliminación cancelada 🙊")
    }
  }

  return { deleteWaste }
}

export default useDeleteTruck3