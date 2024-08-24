import { collection, addDoc } from "firebase/firestore"
import { db } from '../utils/config'

const saveDataToFirestore = async (collectionName, dataItem) => {
  try {
    const dataItemCollection = collection(db, collectionName)
    await addDoc(dataItemCollection, dataItem)
    return { success: true }
  } catch (error) {
    console.error("Error saving data:", error)
    return { success: false, error }
  }
}

export default saveDataToFirestore