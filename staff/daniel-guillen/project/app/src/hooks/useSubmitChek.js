import { collection, addDoc } from 'firebase/firestore'
import { db } from '../utils/config'

const useSubmitCheck = (collectionName, checkList, inspectionNote, workerName) => {
  const saveData = async () => {
    //filtramos todos los indicados 'ARREGLAR'
    const itemsToFix = checkList.filter(item => item.selectedValue === 'ARREGLAR')
    //nos aseguramos que se da una breve explicacion y se 'firma' con nombre de trabajador
    if (!workerName || !inspectionNote) {
      alert('Por favor, complete todos los campos.')
      return
    }
    //estructura de guardado de datos
    const dataCheck = {
      date: new Date().toLocaleDateString(),
      workerName: workerName,
      itemsToFix: itemsToFix.map(item => `${item.apartado}: ${item.elemento}`),
      notes: inspectionNote
    }

    try {
      //llamada a base de datos para hacer guardado
      const dataCheckLoad = collection(db, collectionName)
      await addDoc(dataCheckLoad, dataCheck)
      //añadido visual para saber que se guardo correctamente
      alert('Inspección guardada 🎉 ' + dataCheck.date + ' - ' + workerName)
      window.location.reload()
    } catch (error) {
      console.error("Error registrando la inspección: ", error)
    }
  }

  return { saveData }
}

export default useSubmitCheck