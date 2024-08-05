import React from 'react'
import { useState } from 'react'

const InputWeight = () => {

  const [weight, setWeight] = useState("")

  const handleChange = (event) => {
    const { value } = event.target
    setWeight(value) 
    console.log("Input weight:", value)
  }

  return (
    <div className='InputWeightDiv'>
    <input
    className='InputWeight'
    value={weight} id='InputWeight'
    type='number'
    name='weight'
    placeholder='Introducir el peso'
    onChange={handleChange}
    />
    <h2>Kg.</h2>
    </div>
  )
}

export default InputWeight