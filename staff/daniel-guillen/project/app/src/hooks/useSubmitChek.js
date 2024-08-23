// import { collection, addDoc } from 'firebase/firestore'
// import { db } from '../utils/config'
// import getWeekNumberYear from '../utils/getWeekNumberYear'

// const useSubmitCheck = (collectionName, checkList, inspectionNote, workerName, route, navigate) => {
//   const saveData = async () => {
//     const { week, year } = getWeekNumberYear()

//     // Filtramos todos los indicados 'ARREGLAR'
//     const itemsToFix = checkList.filter(item => item.selectedValue === 'ARREGLAR')

//     // Nos aseguramos que se da una breve explicación y se 'firma' con nombre de trabajador
//     if (!workerName || !inspectionNote) {
//       alert('Por favor, complete todos los campos.')
//       return
//     }

//     // Estructura de guardado de datos
//     const dataCheck = {
//       name: workerName,
//       itemsToFix: itemsToFix.map(item => `${item.apartado}: ${item.elemento}`),
//       notes: inspectionNote,
//       week: week,
//       year: year
//     }

//     try {
//       // Llamada a base de datos para hacer guardado
//       const dataCheckLoad = collection(db, collectionName)
//       await addDoc(dataCheckLoad, dataCheck)

//       // Alerta visual para saber que se guardó correctamente
//       alert('Inspección guardada 🎉 Semana ' + week + ' del ' + year)

//       // Redirigir a la ruta específica usando navigate
//       navigate(route)
//     } catch (error) {
//       console.error("Error registrando la inspección: ", error)
//     }
//   }

//   return { saveData }
// }

// export default useSubmitCheck

// src/hooks/useSubmitCheck.js

import { useCallback } from 'react'
import saveInspectionData from '../utils/saveInspectionData'

const useSubmitCheck = (collectionName, checkList, inspectionNote, workerName, route, navigate) => {
  const saveData = useCallback(async () => {
    try {
      const message = await saveInspectionData(collectionName, checkList, inspectionNote, workerName)
      alert(message)
      navigate(route)
    } catch (error) {
      alert(error.message)
    }
  }, [collectionName, checkList, inspectionNote, workerName, route, navigate])

  return { saveData }
}

export default useSubmitCheck
