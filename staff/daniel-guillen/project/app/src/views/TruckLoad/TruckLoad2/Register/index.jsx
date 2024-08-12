import React, { useState, useEffect } from 'react'
import WasteSelect from '../../../../components/WasteSelect'
import WasteContainer from '../../../../components/WasteContainer'
import WasteWeight from '../../../../components/WasteWeight'
import './index.css'

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../../components/firebase/config'

const RegisterTruckLoad2 = () => {
  const [selectedWaste, setSelectedWaste] = useState("")
  const [weight, setWeight] = useState("")
  const [optionsContainer, setOptionsContainer] = useState("")
  const [week, setWeek] = useState("")
  const [year, setYear] = useState("")

  useEffect(() => {
    const today = new Date()
    setWeek(getWeekNumber(today))
    setYear(today.getFullYear().toString())
  }, []);

  const handleWasteChange = (selectedOption) => {
    setSelectedWaste(selectedOption)
    console.log("Selected waste:", selectedOption)
  }

  const handleWeightChange = (event) => {
    const { value } = event.target
    setWeight(value) 
    console.log("Input weight:", value)
  }

  const handleOptionsContainer = (event) => {
    const { value } = event.target
    setOptionsContainer(value)
    console.log("Selected option:", value)
  }

  // funcion para traer semana
  const getWeekNumber = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  }

  // estructura de datos
  const saveData = () => {
    const dataTruck2 = {
      code: selectedWaste.code,
      description: selectedWaste.description,
      weight: weight,
      container: optionsContainer,
      week: week,
      year: year,
    }
    console.log(dataTruck2)

    // guardamos en base de datos

    const dataTruck2Load = collection(db, "dataTruck2Load")

    addDoc(dataTruck2Load, dataTruck2)
      .then(() => {
        alert('Residuo Registrado 🎉 ' + selectedWaste.code + '-' + selectedWaste.description)
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error registrando el residuo: ", error)
      });
  }

  return (
    <div className='TruckLoadDiv'>
      <form className='TruckLoadForm' onSubmit={(e) => { e.preventDefault(); saveData(); }}>
        <div className='TruckLoadSelectWaste'>
          <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
          <button className='SubmitButton' type='submit'>💾</button>
        </div>

        <div className='TruckLoadSelectedContainer'>
          <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={handleOptionsContainer} />
        </div>

        <div className='WeightWeek'>
          <WasteWeight weight={weight} handleWeightChange={handleWeightChange} />
          <div className='WeekYearDiv'>
          <p>{week} / {year}</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterTruckLoad2
