import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../utils/config'

const useFetchItemsList = (collectionName, refreshList) => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName))
      const docs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setData(docs)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [refreshList, collectionName])

  return { data, fetchData }
}

export default useFetchItemsList