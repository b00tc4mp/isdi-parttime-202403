import { collection, addDoc } from "firebase/firestore"
import { db } from '../firebase/config'

const useSubmitLoad = (collectionName, selectedWaste, weight, optionsContainer, week, year ) => {

    // estructura de datos
    const saveData = () => {
      const dataItem = {
        code: selectedWaste.code,
        description: selectedWaste.description,
        weight: weight,
        container: optionsContainer,
        week: week,
        year: year
      }
      console.log(dataItem)

    // guardamos en base de datos

    const dataItemLoad = collection(db, collectionName)

    addDoc(dataItemLoad, dataItem)
      .then(() => {
        alert('Residuo Registrado 🎉 ' + selectedWaste.code + '-' + selectedWaste.description)
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error registrando el residuo: ", error)
      })
  }

  return { saveData }
}

export default useSubmitLoad