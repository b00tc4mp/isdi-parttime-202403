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
  export const handleSubmit = async (e, selectedWaste, weight, optionsContainer, statusOptions, createWaste, token, validateWasteData, getStoredWaste) => {
    e.preventDefault()
  
    try {
      // Validaciones
      const { month, year } = validateWasteData(selectedWaste, weight, optionsContainer, statusOptions)
  
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
  
      // enviar datos al servidor
      const result = await createWaste(dataWaste, token)
  
      alert(`📦 Residuo Registrado ${selectedWaste.code} ${selectedWaste.description} 🎉`)
  
      // refrescar la lista despues de registrar un nuevo residuo
      getStoredWaste()
    } catch (error) {
      console.error('Error registrando el residuo:', error.message)
      alert('Error: ' + error.message)
    }
  }
  