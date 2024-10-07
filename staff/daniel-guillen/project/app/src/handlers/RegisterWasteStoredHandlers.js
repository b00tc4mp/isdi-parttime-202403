import validateWasteData from 'com/validate/validateWasteData'
import createWaste from '../logic/createWaste'

// seleccion del residuo
export const handleWasteChange = (selectedOption, setSelectedWaste) => {
  setSelectedWaste(selectedOption)
  console.log("Selected waste:", selectedOption)
}

// peso del residuo
export const handleWeightChange = (event, setWeight) => {
  const { value } = event.target
  setWeight(value)
  console.log("Input weight:", value)
}

// acondicionamiento del residuo
export const handleOptionsContainer = (event, setOptionsContainer) => {
  const { value } = event.target
  setOptionsContainer(value)
  console.log("Selected option:", value)
}

// estado del residuo (correcto o estancado)
export const handleStatusOptions = (event, setStatusOptions) => {
  const { value } = event.target
  setStatusOptions(value)
  console.log("Estado del residuo:", value)
}

// enviar registro de residuo
export const handleSubmit = async ( e, selectedWaste, weight, optionsContainer, statusOptions, token, getStoredWaste ) => {
  e.preventDefault()

  try {
    // Obtener mes y año actuales
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())

    // Validaciones
    const { isValid, errors } = validateWasteData({
      code: selectedWaste.code,
      container: optionsContainer,
      description: selectedWaste.description,
      status: statusOptions,
      weight: weight,
      month: month,
      year: year,
    })

    if (!isValid) {
      console.error('Errores de validación:', errors)
      alert(errors.join('\n'))
      return
    }

    // Estructura de los datos para enviar
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
    await createWaste(dataWaste, token)

    alert(`📦 Residuo Registrado ${selectedWaste.code} ${selectedWaste.description} 🎉`)
    // Refrescar la lista después de registrar un nuevo residuo
    getStoredWaste()
  } catch (error) {
    console.error('Error registrando el residuo:', error.message)
    alert('Error: ' + error.message)
  }
}