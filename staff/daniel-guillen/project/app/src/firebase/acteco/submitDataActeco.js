import { collection, addDoc } from "firebase/firestore"
import { db } from '../config'
import getWeekNumberYear from '../../logic/getWeekNumberYear'

const submitDataActeco = (selectedWaste, weight, optionsContainer ) => {
  
  const { week, year } = getWeekNumberYear()

    // estructura de datos
    const saveData = () => {
      const dataActeco = {
        code: selectedWaste.code,
        description: selectedWaste.description,
        weight: weight,
        container: optionsContainer,
        week: week,
        year: year
      }
      console.log(dataActeco)

    // guardamos en base de datos

    const dataActecoLoad = collection(db, "dataTruck1Load")

    addDoc(dataActecoLoad, dataActeco)
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

export default submitDataActeco