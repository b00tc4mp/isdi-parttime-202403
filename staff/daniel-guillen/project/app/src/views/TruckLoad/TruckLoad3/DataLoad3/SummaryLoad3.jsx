import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../../components/firebase/config'
import './index.css'

const SummaryLoad3 = () => {

    const [list, setList] = useState([])
    const [week, setWeek] = useState("")

    useEffect(() => {
      const today = new Date()
      setWeek(getWeekNumber(today))
    }, [])
  
      // funcion para traer semana
      const getWeekNumber = (date) => {
        const startOfYear = new Date(date.getFullYear(), 0, 1)
        const pastDaysOfYear = (date - startOfYear) / 86400000
        return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)
      }
    
    //solicitar y renderizamos lista de residuos
    useEffect(() => {
      const getList = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'dataTruck3Load'))
          const docs = []
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id })
          });
  
          setList(docs)
        } catch (error) {
          console.log(error)
        }
      }
    
      getList()
    }, [])
  
    // Agrupaamos item.code y se muestra una unica iteracion
    const groupedItemCode = list.reduce((acc, item) => {
      const existingItemCode = acc.find(i => i.code === item.code)
      if (existingItemCode) {
        // pero sumamos el valor de todos sus item.weight
        existingItemCode.totalWeight += parseFloat(item.weight)
      } else {
        acc.push({ ...item, totalWeight: parseFloat(item.weight) })
      }
      return acc
    }, []);

  return (
    <div className='SummaryDiv' >
        <h2 className='summaryTitle' >3a Carga de la Semana {week}:</h2>
      {groupedItemCode
        .sort((a, b) => a.code.localeCompare(b.code)) // Ordenar por code
        .map((item) => {
          // Limitamos la descripcion a 34 caracteres
          const shortDescription = item.description.length > 34
            ? item.description.substring(0, 34) + '...'
            : item.description;

          return (
            <div className='SummaryWasteDataDiv' key={item.id}>
              <p>{item.code} - Total: {item.totalWeight}kg</p>
              <p className='ShortDescription' >{shortDescription}</p>
            </div>
          )
        })}
    </div>
  )
}

export default SummaryLoad3