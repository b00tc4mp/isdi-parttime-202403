const validateInspectionData = (inspectionData) => {
  const { workerName, selectedVehicle, checkList, inspectionNote } = inspectionData
  const errors = []

  // Validar workerName
  if (!workerName || typeof workerName !== 'string') {
    errors.push('El nombre del trabajador es requerido y debe ser una cadena.')
  }

  // Validar selectedVehicle
  if (!selectedVehicle || typeof selectedVehicle !== 'object') {
    errors.push('El vehículo seleccionado es requerido.')
  } else {
    const { id, model, size } = selectedVehicle
    if (!id || typeof id !== 'string') {
      errors.push('El ID del vehículo es requerido.')
    }
    if (!model || typeof model !== 'string') {
      errors.push('El modelo del vehículo es requerido.')
    }
    if (!['small', 'medium', 'big'].includes(size)) {
      errors.push('El tamaño del vehículo debe ser "small", "medium" o "big".')
    }
  }

  // Validar checkList
  if (!Array.isArray(checkList) || checkList.length === 0) {
    errors.push('La lista de verificación (itemFix) es requerida y debe contener al menos un elemento.')
  }

  // Validar inspectionNote
  if (!inspectionNote || typeof inspectionNote !== 'string') {
    errors.push('Las notas de la inspección son requeridas.')
  }

  if (errors.length > 0) { // Si hay errores
    return { isValid: false, errors }
  }

  return { isValid: true, inspectionData }
}

export default validateInspectionData