import validateLoadData from 'com/validate/validateLoadData'
import createLoad from '../logic/createLoad'

// monitoreamos reference
export const handleReferenceChange = (setReference) => (newReference) => {
  setReference(newReference)
}

// seleccion del residuo
export const handleWasteChange = (selectedOption, setSelectedWaste) => {
  setSelectedWaste(selectedOption)
  console.log('Residuos seleccionados:', selectedOption)
}

// peso del residuo
export const handleWeightChange = (event, setWeight) => {
  const weight = event.target.value
  setWeight(weight)
  console.log('Peso ingresado:', weight)
}

// acondicionamiento del residuo
export const handleOptionsContainer = (event, setOptionsContainer) => {
  const container = event.target.value
  setOptionsContainer(container)
  console.log('Opción de contenedor seleccionada:', container)
}

// enviar registro de residuo
export const handleSubmit = async (e, selectedWaste, weight, optionsContainer, week, year, reference, token, getLoadWaste) => {
  e.preventDefault()
  
  try {
    // Validaciones
    const { isValid, errors } = validateLoadData({
      code: selectedWaste.code,
      container: optionsContainer,
      description: selectedWaste.description,
      reference: reference,
      weight: weight,
      week: week,
      year: year,
    })

    if (!isValid) {
      console.error('Errores de validación:', errors)
      alert(errors.join('\n'))
      return
    }

    // Estructura de los datos para enviar
    const dataLoad = {
      code: selectedWaste.code,
      description: selectedWaste.description,
      weight: weight,
      container: optionsContainer,
      reference: reference,
      week: week,
      year: year
    }

    // Enviar datos al servidor
    await createLoad(dataLoad, token)

    alert(`📦 Carga ${dataLoad.description} registrada en ${dataLoad.reference} 🎉`)
    getLoadWaste()
  } catch (error) {
    console.error('Error registrando carga:', error.message)
    alert('Error registrando carga:' + error.message)
  }
}