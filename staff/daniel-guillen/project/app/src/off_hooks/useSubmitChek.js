import { useCallback } from 'react'
import saveInspectionData from '../utils/saveInspectionData'

const useSubmitCheck = (collectionName, checkList, inspectionNote, workerName, route, navigate) => {
  const saveData = useCallback(async () => {
    try {
      const message = await saveInspectionData(collectionName, checkList, inspectionNote, workerName)
      alert(message)
      navigate(route)
    } catch (error) {
      alert(error.message)
    }
  }, [collectionName, checkList, inspectionNote, workerName, route, navigate])

  return { saveData }
}

export default useSubmitCheck
