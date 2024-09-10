import { useState } from 'react'
// components
import WasteSelect from '../../components/WasteSelect'
import WasteContainer from '../../components/WasteContainer'
import WasteWeight from '../../components/WasteWeight'
import Button from '../../../../components/core/Button'
import getWeekNumberYear from '../../../../utils/getWeekNumberYear'

const Register = () => {
  const { week, year } = getWeekNumberYear()

  const [selectedWaste, setSelectedWaste] = useState({ code: "", description: "" })
  const [weight, setWeight] = useState("")
  const [optionsContainer, setOptionsContainer] = useState("")

  const handleWasteChange = (selectedOption) => {
    setSelectedWaste(selectedOption)
    console.log("Residuos seleccionados:", selectedOption)
  }

  const handleWeightChange = (event) => {
    setWeight(event.target.value)
    console.log("Peso ingresado:", event.target.value)
  }

  const handleOptionsContainer = (event) => {
    setOptionsContainer(event.target.value)
    console.log("Opción de contenedor seleccionada:", event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      // traemos referencia guardada en localStorage
      const reference = sessionStorage.getItem('reference')

      // Validaciones
      if (!selectedWaste.code || typeof selectedWaste.code !== 'string') {
        throw new Error('Código es requerido.')
      }
      if (!['PALET', 'GRG', 'BIGBAG', 'B200', 'B-200'].includes(optionsContainer)) {
        throw new Error('Elija uno de los siguientes valores: PALET, GRG, BIGBAG, B200, B-200.')
      }
      if (!selectedWaste.description || typeof selectedWaste.description !== 'string') {
        throw new Error('Descripción es requerida.')
      }
      if (!reference || typeof reference !== 'string') {
        throw new Error('Referencia es requerida y debe tener al menos 4 caracteres.')
      }
      if (!/^\d{1,4}$/.test(weight) || Number(weight) < 5 || Number(weight) > 1500) {
        throw new Error('Peso debe ser un número entre 5 y 1500.')
      }
      if (!week || typeof week !== 'string' || !/^(0[1-9]|[1-4][0-9]|5[0-3])$/.test(week)) {
        throw new Error('Semana es requerida y debe ser un número entre "01" y "53".')
      }
      if (!year || year < '2024' || year > '2099') {
        throw new Error('Año es requerido y debe ser un número de 4 dígitos (Ejemplo: "2024").')
      }

      // estructura datos para enviar
      const dataLoad = {
        code: selectedWaste.code,
        description: selectedWaste.description,
        weight: weight,
        container: optionsContainer,
        reference: reference, // la traemos del localstorage
        week: week,
        year: year,
      }

      // enviamos datos al servidor
      const response = await fetch(`${import.meta.env.VITE_API_URL}departures/createLoad`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataLoad),
      })

      const result = await response.json()

      if (response.ok) {
        alert(`Carga ${selectedWaste.description} registrada en ${reference} 🎉`)
       // Refrescamos lista despues de registrar una nueva carga (pendiente de mejorar)
       window.location.reload()
      } else {
        throw new Error(result.message || 'Error al registrar carga')
      }
    } catch (error) {
      console.error('Error registrando carga:', error.message)
      alert('Error: ' + error.message)
    }
  }
  

  return (
    <div className='TruckLoadDiv'>
      <form className='TruckLoadForm' onSubmit={handleSubmit}>
        <div className='TruckLoadSelectWaste'>
          <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
          {/* <Button className='SubmitButton' type='submit'>
            <img className='SubmitButtonImage' src={michelangelo64} alt='Submit' />
          </Button> */}
        </div>

        <div className='TruckLoadSelectedContainer'>
          <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={handleOptionsContainer} />
        </div>

        <div className='WeightWeekButtton'>
          <div className='WeightWeek'>

          <WasteWeight weight={weight} handleWeightChange={handleWeightChange} />
          
          <div className='WeekYear'>
          <p>{week}/{year}</p>
          </div>

          </div>
        <Button className='SubmitButtonLoad' type='submit'>💾</Button>
        </div>
        
      </form>
    </div>
  )
}

export default Register
