// logic utils
import createInspection from "../../logic/vehicles/createInspection"
import fetchUserName from "../../logic/users/getUserName"
import getTodayMonthYear from "../../utils/getTodayMonthYear"
// validations erros
import validate from "com/validate/validateVehicles"
import { SystemError, ValidationError } from "com/errors"

export const handleVehicleChange = (selectedVehicle, setSelectedVehicle) => {
  setSelectedVehicle(selectedVehicle)
}
export const handleRadioChange = (id, value, checkList, setCheckList) => {
  const updatedCheckList = checkList.map(item =>
    item.id === id ? { ...item, selectedValue: value } : item
  )
  setCheckList(updatedCheckList)
}
export const filterItemsToFix = (checkList, alert) => {
  const itemFix = checkList
    .filter(item => item.selectedValue === 'ARREGLAR')
    .map(item => ({ Apartado: item.apartado, Elemento: item.elemento }))

  if (itemFix.length === 0) {
    alert('No hay elementos marcados como "ARREGLAR".')
    return null
  }
  return itemFix
}

export const saveData = async (selectedVehicle, checkList, inspectionNote, token, navigate, alert) => {
  const workerName = await fetchUserName(token)
  const { date, month, year } = getTodayMonthYear()
  const itemFix = filterItemsToFix(checkList, alert)
  if (!itemFix) return
    
    try {
      
      validate.vehicle({ id: selectedVehicle.id, model: selectedVehicle.model, size: selectedVehicle.size })
      validate.inspection({ itemFix, inspectionNote })
      validate.worker({ workerName, month, year, date })
      const newInspection = {
        vehicle: { id: selectedVehicle.id, model: selectedVehicle.model, size: selectedVehicle.size },
        inspection: { itemFix, inspectionNote },
        worker: ({ workerName, month, year, date })
      }

      await createInspection(newInspection, token)

      alert(`Inspección registrada: ${workerName} - ${selectedVehicle.model} - ${date} 🎉`)
      navigate(`/Vehicles/historical/${selectedVehicle.id}`)
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