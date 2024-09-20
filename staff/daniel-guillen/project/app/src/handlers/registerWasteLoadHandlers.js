// logic
import createLoad from "../logic/createLoad"

  // monitoreamos reference
export const handleReferenceChange = (setReference) => (newReference) => {
    setReference(newReference)
  } 
  // seleccion del residuo
export const handleWasteChange = (selectedOption, setSelectedWaste) => {
    setSelectedWaste(selectedOption)
    console.log("Residuos seleccionados:", selectedOption)
  }
  // peso del residuo
  export const handleWeightChange = (event, setWeight) => {
    const weight = event.target.value
    setWeight(weight)
    console.log("Peso ingresado:", weight)
  }
  // acondicionamiento del residuo
  export const handleOptionsContainer = (event, setOptionsContainer) => {
    const container = event.target.value
    setOptionsContainer(container)
    console.log("Opción de contenedor seleccionada:", container)
  }
  // enviar registro de residuo
  export const handleSubmit = async ( e, selectedWaste, weight, optionsContainer, week, year, reference, token, validateLoadData, getLoadWaste ) => {
    e.preventDefault()
    try {
      // traemos referencia guardada en sessionStorage
      const reference = sessionStorage.getItem('reference')
  
      // validaciones
      validateLoadData(selectedWaste, optionsContainer, weight, week, year, reference)
  
      // estructura de los datos para enviar
      const dataLoad = {
        code: selectedWaste.code,
        description: selectedWaste.description,
        weight: weight,
        container: optionsContainer,
        reference: reference,
        week: week,
        year: year,
      }
  
      // enviamos los datos al servidor
      await createLoad(dataLoad, token)

      alert(`📦 Carga ${dataLoad.description} registrada en ${dataLoad.reference} 🎉`)
      getLoadWaste()
    } catch (error) {
      console.error('Error registrando carga:', error.message)
      alert('Error: ' + error.message)
    }
  }