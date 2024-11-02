import createWaste from '../../logic/stored/createWaste'
import validate from 'com/validate/validateStored'
import { ValidationError, SystemError } from '../../../../com/errors'

export const handleWasteChange = (selectedOption, setSelectedWaste) => {
    setSelectedWaste(selectedOption) 
}
export const handleWeightChange = (event, setWeight) => {
    const { value } = event.target
    setWeight(value) 
}
export const handleOptionsContainer = (event, setOptionsContainer) => {
    const { value } = event.target
    setOptionsContainer(value)
}
export const handleStatusOptions = (event, setStatusOptions) => {
    const { value } = event.target
    setStatusOptions(value)
}
export const handleSubmit = async (e, selectedWaste, weight, optionsContainer, statusOptions, month, year, token, alert, getStoredWaste) => {
    e.preventDefault()
    try { 
            validate.code(selectedWaste.code)
            validate.container(optionsContainer)
            validate.description(selectedWaste.description)
            validate.status(statusOptions)
            validate.weight(weight)
            validate.month(month)
            validate.year(year)

        const newDataWaste = {
            code: selectedWaste.code,
            description: selectedWaste.description,
            weight: weight,
            container: optionsContainer,
            status: statusOptions,
            month: month,
            year: year
        }

        await createWaste(newDataWaste, token)
        alert(`📦 Residuo Registrado ${selectedWaste.code} ${selectedWaste.description} 🎉`)
        getStoredWaste()
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