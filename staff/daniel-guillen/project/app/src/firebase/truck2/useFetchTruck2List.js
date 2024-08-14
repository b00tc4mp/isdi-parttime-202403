import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config'

const useFetchTruck2List = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'dataTruck2Load'))
        const docs = []
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id })
        })
        setList(docs)
      } catch (error) {
        console.log(error)
      }
    }

    getList()
  }, [])

  return { list, setList }
}

export default useFetchTruck2List
