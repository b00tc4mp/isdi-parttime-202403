import { collection, addDoc } from "firebase/firestore"
import { db } from '../utils/config'

const submitDataStoreWaste = (collectionName, selectedWaste, weight, optionsContainer, statusOptions) => {
  
  const saveData = () => {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())

    const dataWaste = {
      code: selectedWaste.code,
      description: selectedWaste.description,
      weight: weight,
      container: optionsContainer,
      status: statusOptions,
      month: month,
      year: year
    }
    console.log(dataWaste)

    const dataBaseStoreWaste = collection(db, collectionName)

    addDoc(dataBaseStoreWaste, dataWaste)
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

export default submitDataStoreWaste