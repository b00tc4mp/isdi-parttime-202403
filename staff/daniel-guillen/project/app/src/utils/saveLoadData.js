import saveDataToFirestore from '../logic/dataService'

const saveLoadData = async (collectionName, selectedWaste, weight, optionsContainer, week, year) => {
  const dataItem = {
    code: selectedWaste.code,
    description: selectedWaste.description,
    weight: weight,
    container: optionsContainer,
    week: week,
    year: year
  }

  const result = await saveDataToFirestore(collectionName, dataItem)

  if (result.success) {
    alert('Residuo Registrado 🎉 ' + selectedWaste.code + '-' + selectedWaste.description)
    window.location.reload()
  } else {
    console.error("Error registrando el residuo:", result.error)
    alert('Error registrando el residuo. Por favor, inténtelo de nuevo.')
  }
}

export default saveLoadData
