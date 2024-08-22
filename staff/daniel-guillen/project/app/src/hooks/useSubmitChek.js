import { collection, addDoc } from 'firebase/firestore'
import { db } from '../utils/config'
import getWeekNumberYear from '../utils/getWeekNumberYear'

const useSubmitCheck = (collectionName, checkList, inspectionNote, workerName, route) => {
  const saveData = async () => {

    const { week, year } = getWeekNumberYear()
    
    //filtramos todos los indicados 'ARREGLAR'
    const itemsToFix = checkList.filter(item => item.selectedValue === 'ARREGLAR')
    
    //nos aseguramos que se da una breve explicacion y se 'firma' con nombre de trabajador
    if (!workerName || !inspectionNote) {
      alert('Por favor, complete todos los campos.')
      return
    }

    //estructura de guardado de datos
    const dataCheck = {
      name: workerName,
      itemsToFix: itemsToFix.map(item => `${item.apartado}: ${item.elemento}`),
      notes: inspectionNote,
      week: week,
      year: year
    }

    try {
      //llamada a base de datos para hacer guardado
      const dataCheckLoad = collection(db, collectionName)
      await addDoc(dataCheckLoad, dataCheck)
      //alerta visual para saber que se guardo correctamente
      alert('Inspección guardada 🎉 Semana ' + week + ' del ' + year)
      window.location.href = route
    } catch (error) {
      console.error("Error registrando la inspección: ", error)
    }
  }

  return { saveData }
}

export default useSubmitCheck