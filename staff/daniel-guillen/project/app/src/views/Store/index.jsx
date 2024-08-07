import React, { useState } from 'react'
import WasteSelect from './WasteSelect'
import WasteContainer from './WasteContainer'
import WasteStatus from './WasteStatus'
import WasteWeight from './WasteWeight'
import './index.css'

import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase/config';

const Index = () => {

  const [selectedWaste, setSelectedWaste] = useState("")
  const [weight, setWeight] = useState("")
  const [ optionsContainer, setOptionsContainer] = useState("")
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

  const guardar = () => {
    const dataWaste = {
      code: selectedWaste,
      weight: weight,
      container: optionsContainer,
      status: statusOptions,
    }
    console.log(dataWaste)

    const dataBaseStoreWaste = collection(db, "dataStoreWaste" )

    addDoc(dataBaseStoreWaste, dataWaste)
    alert('Residuo Registrado 🎉')
  }

  return (
    <div className='StoreDiv'>
      <h1 className='StoreTitle'>INVENTARIO</h1>
      <form className='StoreWasteForm' onSubmit={(e) => { e.preventDefault(); guardar(); }}>

        <div className='StoreSelectWaste'>
        <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
        </div>
        <div className='StoreSelectOptions'>
        <div className='StoreSelectedContainer'>
        <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={handleOptionsContainer} />
        </div>
        <div className='WeightStatus'>
        <WasteWeight weight={weight} handleWeightChange={handleWeightChange} />
        <WasteStatus statusOptions={statusOptions} handleStatusOptions={handleStatusOptions} />
        </div>
        <button className='SubmitButton' type='submit'>💾</button>
        </div>

      
      </form>

    </div>
  )
}

export default Index