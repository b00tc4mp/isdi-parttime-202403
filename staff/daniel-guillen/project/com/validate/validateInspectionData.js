export const validateInspectionData = (workerName, selectedVehicle, checkList, inspectionNote) => {
    if (!workerName) {
      alert('Error: El nombre del trabajador no está disponible.')
      return false
    }
  
    const { id, model, size } = selectedVehicle || {}
  
    if (!id || !model || !size) {
      alert('Error: Los campos "id", "model" y "size" son obligatorios.')
      return false
    }
  
    if (!Array.isArray(checkList) || checkList.length === 0) {
      alert('Error: El campo "itemFix" es requerido.')
      return false
    }
  
    if (!inspectionNote) {
      alert('Error: El campo "notes" es requerido.')
      return false
    }
  
    return true
  }
  // filtrar solo elementos que han sido marcados como "ARREGLAR"
  export const filterItemsToFix = (checkList) => {
    const itemFix = checkList
      .filter(item => item.selectedValue === 'ARREGLAR')
      .map(item => ({ Apartado: item.apartado, Elemento: item.elemento }))
  
    if (itemFix.length === 0) {
      alert('No hay elementos marcados como "ARREGLAR".')
      return null
    }
  
    return itemFix
  }  