import { collection, addDoc } from 'firebase/firestore'
import { db } from '../utils/config'

import getWeekNumberYear from './getWeekNumberYear'

const saveInspectionData = async (collectionName, checkList, inspectionNote, workerName) => {
  const { week, year } = getWeekNumberYear()

  // filtramos los elementos marcados como ARREGLAR
  const itemsToFix = checkList.filter(item => item.selectedValue === 'ARREGLAR')

  // nos aseguramos una breve explicacion y la firma del trabajador
  if (!workerName || !inspectionNote) {
    throw new Error('Por favor, complete todos los campos.')
  }

  // estructura de datos
  const dataCheck = {
    name: workerName,
    itemsToFix: itemsToFix.map(item => `${item.apartado}: ${item.elemento}`),
    notes: inspectionNote,
    week: week,
    year: year
  }

  try {
    // guardar en la base de datos
    const dataCheckLoad = collection(db, collectionName)
    await addDoc(dataCheckLoad, dataCheck)
    return `Inspección guardada 🎉 Semana ${week} del ${year}`
  } catch (error) {
    throw new Error(`Error registrando la inspección: ${error.message}`)
  }
}

export default saveInspectionData
