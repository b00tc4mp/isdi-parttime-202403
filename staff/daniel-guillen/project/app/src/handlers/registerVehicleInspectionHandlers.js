import validateInspectionData from "com/validate/validateInspectionData"
import createInspection from "../logic/createInspection"
import fetchUserName from "../logic/getUserName"

// handle vehicle selection
export const handleVehicleChange = (selectedVehicle, setSelectedVehicle) => {
  setSelectedVehicle(selectedVehicle)
  console.log("Vehículo seleccionado:", selectedVehicle)
}

// handle checklist values
export const handleRadioChange = (id, value, checkList, setCheckList) => {
  const updatedCheckList = checkList.map(item =>
    item.id === id ? { ...item, selectedValue: value } : item
  )
  setCheckList(updatedCheckList)
}

export const filterItemsToFix = (checkList) => { // filtrar marcados como "ARREGLAR"
  const itemFix = checkList
    .filter(item => item.selectedValue === 'ARREGLAR')
    .map(item => ({ Apartado: item.apartado, Elemento: item.elemento }))

  if (itemFix.length === 0) {
    alert('No hay elementos marcados como "ARREGLAR".')
    return null
  }

  return itemFix
}

// enviar registro de inspeccion
export const saveData = async (selectedVehicle, checkList, inspectionNote, token, navigate) => {
  try {
    const workerName = await fetchUserName(token)// obtener username
        
    if (!workerName || !selectedVehicle || !checkList) { // Verificar inputs
      console.error("Faltan datos requeridos para registrar la inspección.")
      alert("Faltan datos requeridos para registrar la inspección.")
      return
    }

    const today = new Date() // Obtener fecha actual
    const date = today.toISOString()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())

    const inspectionData = { // Crear el objeto para ser validado
      workerName,
      selectedVehicle,
      checkList,
      inspectionNote,
    }

    
    const { isValid, errors } = validateInspectionData(inspectionData) // Validaciones
    if (!isValid) {
      alert(errors.join('\n')) // Mostrar errores si la validación falla
      return
    }

    const itemFix = filterItemsToFix(checkList) // Filtrar los elementos que se necesitan arreglar
    if (!itemFix) return

    const newInspection = {    // Estructura de los datos para enviar
      vehicle: { id: selectedVehicle.id, model: selectedVehicle.model, size: selectedVehicle.size },
      inspection: { itemFix, notes: inspectionNote },
      worker: { workerName, month, year, date }
    }

    await createInspection(newInspection, token) // Enviar los datos al servidor

    alert(`Inspección registrada: ${workerName} - ${selectedVehicle.model} - ${date} 🎉`) // resultado exitoso
    navigate(`/Vehicles/historical/${selectedVehicle.id}`)     // Redireccionar al historial
  } catch (error) {
    console.error("Error al registrar la inspección:", error)
    alert("Error al registrar la inspección: " + error.message)
  }
}