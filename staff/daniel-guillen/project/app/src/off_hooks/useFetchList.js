import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../utils/config'

// Pasaremos el nombre de la coleccion como parametro
const useFetchList = (collectionName) => {
  const [list, setList] = useState([])

  useEffect(() => {
    const getList = async () => {
      try {
        // Usando la coleccion dinamiecamente
        const querySnapshot = await getDocs(collection(db, collectionName))
        const docs = []
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id })
        })
        setList(docs)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }

    getList()
  }, [collectionName])

  return { list, setList }
}

export default useFetchList