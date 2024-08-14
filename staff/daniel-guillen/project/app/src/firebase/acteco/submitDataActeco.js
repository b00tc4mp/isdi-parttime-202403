import { collection, addDoc } from "firebase/firestore"
import { db } from '../config'
import { useState, useEffect } from 'react'

import getWeekNumber from "../../logic/getWeekNumber"

const submitDataActeco = (selectedWaste, weight, optionsContainer ) => {
  
    const [week, setWeek] = useState("")
    const [year, setYear] = useState("")

    useEffect(() => {
      const today = new Date()
      setWeek(getWeekNumber(today))
      setYear(today.getFullYear().toString())
    }, [])

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

    const dataActecoLoad = collection(db, "dataActecoLoad")

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