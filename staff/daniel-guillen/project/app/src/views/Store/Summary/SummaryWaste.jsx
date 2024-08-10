import React, { useEffect, useState } from 'react'
import { collection, getDocs  } from 'firebase/firestore'
import { db } from "../../../firebase/config"
import './index.css'

const SummaryWaste = () => {

    const [list, setList] = useState([])

    //solicitar y renderizamos lista de residuos
    useEffect(() => {
      const getList = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'dataStoreWaste'))
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
    <div className='SummaryWasteDiv' >
        <h2>Datos resumidos de Residuos:</h2>
      {groupedItemCode
        .sort((a, b) => a.code.localeCompare(b.code)) // Ordenar por code
        .map((item) => {
          // Limitamos la descripcion a 34 caracteres
          const shortDescription = item.description.length > 34
            ? item.description.substring(0, 34) + '...'
            : item.description;

          return (
            <div className='SummaryWasteDataDiv' key={item.id}>
              <p className='SummaryWasteData'>
                {item.code} - Total: {item.totalWeight}kg
              </p>
              <p className='ShortDescription' >{shortDescription}</p>
            </div>
          );
        })}
    </div>
  )
}

export default SummaryWaste