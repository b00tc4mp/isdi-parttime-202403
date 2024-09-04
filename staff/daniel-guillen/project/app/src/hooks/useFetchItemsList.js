import { useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../utils/config'

const useFetchItemsList = () => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, StoredWaste))
      const docs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setData(docs)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // useEffect(() => {
  //   fetchData()
  // }, [refreshList, StoredWaste])

  return { data, fetchData }
}

export default useFetchItemsList