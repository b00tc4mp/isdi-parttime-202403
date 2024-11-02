import createLoad from '../../logic/departures/createLoad'
import validate from 'com/validate/validateDepartures'
import { ValidationError, SystemError } from '../../../../com/errors'

export const handleReferenceChange = (setReference) => (newReference) => {
  setReference(newReference)
}
export const handleWasteChange = (selectedOption, setSelectedWaste) => {
  setSelectedWaste(selectedOption)
}
export const handleWeightChange = (event, setWeight) => {
  const weight = event.target.value
  setWeight(weight)
}
export const handleOptionsContainer = (event, setOptionsContainer) => {
  const container = event.target.value
  setOptionsContainer(container)
}
export const handleSubmit = async (e, selectedWaste, weight, optionsContainer, week, year, reference, token, alert, getLoadWaste) => {
    e.preventDefault()
    try {
        validate.code(selectedWaste.code,)
        validate.container(optionsContainer)
        validate.description(selectedWaste.description)
        validate.reference(reference)
        validate.weight(weight)
        validate.week(week)
        validate.year(year)
      
      const newDataLoad = { 
        code: selectedWaste.code,
        description: selectedWaste.description,
        weight: weight,
        container: optionsContainer,
        reference: reference,
        week: week,
        year: year
      }
      
      await createLoad(newDataLoad, token)     
      
      alert(`📦 Carga ${selectedWaste.description} registrada en ${reference} 🎉`) 
      getLoadWaste()
    } catch (error) {
      if (error instanceof ValidationError) {
          alert('Error de validación: ' + error.message) 
      } else if (error instanceof SystemError) {
          alert('Error del sistema: ' + error.message) 
      } else {
          alert('Error inesperado: ' + error.message) 
      }
  }
}