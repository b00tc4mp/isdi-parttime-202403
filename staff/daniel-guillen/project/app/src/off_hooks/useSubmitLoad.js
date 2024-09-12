import saveLoadData from "../utils/saveLoadData"

const useSubmitLoad = (collectionName, selectedWaste, weight, optionsContainer, week, year, refreshData) => {
  const saveData = async () => {
    const result = await saveLoadData(collectionName, selectedWaste, weight, optionsContainer, week, year)
    
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
export default useSubmitLoad