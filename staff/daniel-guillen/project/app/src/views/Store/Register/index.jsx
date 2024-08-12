import React, { useState } from 'react'
import WasteSelect from '../../../components/WasteSelect'
import WasteContainer from '../../../components/WasteContainer'
import WasteStatus from './WasteStatus'
import WasteWeight from '../../../components/WasteWeight'
import './index.css'

import { collection, addDoc } from "firebase/firestore"
import { db } from '../../../components/firebase/config'

const Register = () => {

  const [selectedWaste, setSelectedWaste] = useState("")
  const [weight, setWeight] = useState("")
  const [optionsContainer, setOptionsContainer] = useState("")
  const [statusOptions, setStatusOptions] = useState("CORRECTO")

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

  const handleStatusOptions = (event) => {
    const { value } = event.target
    setStatusOptions(value)
    console.log("Estado del residuo:", value)
  }


  const saveData = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear())

    const dataWaste = {
      code: selectedWaste.code,
      description: selectedWaste.description,
      weight: weight,
      container: optionsContainer,
      status: statusOptions,
      date: `${day}/${month}/${year}`
    }
    console.log(dataWaste)

    const dataBaseStoreWaste = collection(db, "dataStoreWaste" )

    addDoc(dataBaseStoreWaste, dataWaste)
    .then(() => {
      alert('Residuo Registrado 🎉 ' + selectedWaste.code + '-' + selectedWaste.description);
      window.location.reload()
    })
    .catch((error) => {
      console.error("Error registrando el residuo: ", error);
    });
  }

  return (
    <div className='StoreDiv'>
      {/* <h1 className='StoreTitle'>INVENTARIO</h1> */}
      <form className='StoreWasteForm' onSubmit={(e) => { e.preventDefault(); saveData(); }}>

        <div className='StoreSelectWaste'>
        <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
        <button className='SubmitButton' type='submit'>💾</button>
        </div>

        
        
        <div className='StoreSelectedContainer'>
        <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={handleOptionsContainer} />
        </div>
        
        <div className='WeightStatus'>
        <WasteWeight weight={weight} handleWeightChange={handleWeightChange} />
        <WasteStatus statusOptions={statusOptions} handleStatusOptions={handleStatusOptions} />
        </div>
      </form>
    </div>
  )
}

export default Register