import saveWasteData from '../utils/saveWasteData'

const useSubmitWaste = (collectionName, selectedWaste, weight, optionsContainer, statusOptions, refreshData) => {
  const saveData = async () => {
    const result = await saveWasteData(collectionName, selectedWaste, weight, optionsContainer, statusOptions)
    
    if (result.success) {
      alert('Residuo Registrado 🎉 ' + selectedWaste.code + '-' + selectedWaste.description)
      refreshData()  // prueba de refrescar la lista de datos
    } else {
      console.error("Error registrando el residuo:", result.error)
      // gestionar luego error
    }
  }

  return { saveData }
}

export default useSubmitWaste