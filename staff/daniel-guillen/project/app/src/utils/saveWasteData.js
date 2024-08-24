import saveDataToFirestore from '../logic/dataService'

const saveWasteData = async (collectionName, selectedWaste, weight, optionsContainer, statusOptions) => {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  const dataWaste = {
    code: selectedWaste.code,
    description: selectedWaste.description,
    weight: weight,
    container: optionsContainer,
    status: statusOptions,
    month: month,
    year: year
  }

  const result = await saveDataToFirestore(collectionName, dataWaste)

  return result;
}

export default saveWasteData