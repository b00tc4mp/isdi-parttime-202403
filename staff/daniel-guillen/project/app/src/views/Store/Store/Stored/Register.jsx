import { useState } from 'react'
// Components
import michelangelo64 from '../../../../components/img/michelangelo64.png'
import Button from '../../../../components/core/Button'
import WasteSelect from '../../components/WasteSelect'
import WasteContainer from '../../components/WasteContainer'
import WasteStatus from '../../components/WasteStatus'
import WasteWeight from '../../components/WasteWeight'

const Register = () => {
  
  const [selectedWaste, setSelectedWaste] = useState({ code: "", description: "" })
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const today = new Date()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const year = String(today.getFullYear())

      // Validaciones
      if (!selectedWaste.code || typeof selectedWaste.code !== 'string') {
        throw new Error('El campo "code" es requerido y debe ser una cadena.')
      }
      if (!['PALET', 'GRG', 'BIGBAG', 'B200', 'B-200'].includes(optionsContainer)) {
        throw new Error('El campo "container" debe ser uno de los siguientes valores: PALET, GRG, BIGBAG, B200, B-200.')
      }
      if (!selectedWaste.description || typeof selectedWaste.description !== 'string') {
        throw new Error('El campo "description" es requerido y debe ser una cadena.')
      }
      if (!statusOptions || !['CORRECTO', 'ESTANCADO'].includes(statusOptions)) {
        throw new Error('El campo "status" debe ser "CORRECTO" o "ESTANCADO".')
      }
      if (!/^\d{1,4}$/.test(weight) || Number(weight) < 5 || Number(weight) > 1500) {
        throw new Error('El campo "weight" es requerido y debe ser un número entre 5 y 1500.')
      }
      if (!month || !/^(0[1-9]|1[0-2])$/.test(month)) {
        throw new Error('El campo "month" es requerido y debe ser una cadena con un valor entre "01" y "12".')
      }
      if (!year || year < '2024' || year > '2099') {
        throw new Error('El campo "year" es requerido y debe ser una cadena de 4 dígitos (Ejemplo: "2024").')
      }

      // Preparar datos para enviar
      const dataWaste = {
        code: selectedWaste.code,
        description: selectedWaste.description,
        weight: weight,
        container: optionsContainer,
        status: statusOptions,
        month: month,
        year: year,
      }

      // Enviar datos al servidor
      const response = await fetch(`${import.meta.env.VITE_API_URL}stored/createWaste`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWaste),
      })

      const result = await response.json()

      if (response.ok) {
        alert(`Residuo Registrado ${selectedWaste.code} ${selectedWaste.description} 🎉`)
       // Refrescamos lista después de registrar un nuevo residuo
       window.location.reload()
      } else {
        throw new Error(result.message || 'Error al registrar el residuo')
      }
    } catch (error) {
      console.error('Error registrando el residuo:', error.message)
      alert('Error: ' + error.message) // Muestra un mensaje de error al usuario
    }
  }

  return (
    <div className='StoreDiv'>
      <h1 className='RouteTitle'>INVENTARIO</h1>

      <form className='StoreWasteForm' onSubmit={handleSubmit}>
        <div className='StoreSelectWaste'>
          <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
          <Button className='SubmitButton' type='submit'>
            <img className='SubmitButtonImage' src={michelangelo64} />
          </Button>
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
