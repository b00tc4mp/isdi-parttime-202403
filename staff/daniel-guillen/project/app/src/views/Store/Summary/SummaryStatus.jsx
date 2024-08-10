import React, { useEffect, useState } from 'react'
import { collection, getDocs  } from 'firebase/firestore'
import { db } from "../../../firebase/config"
import './index.css'

const SummaryStatus = () => {

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

 // Filtrar los residuos con status 'ESTANCADO'
 const filteredList = list
 .filter(item => item.status === 'ESTANCADO')
 .sort((a, b) => a.code.localeCompare(b.code)); // Ordenar por code

return (
 <div className='SummaryStatusDiv'>
   <h2>Residuos estancados:</h2>
   {filteredList.map(item => {
     // Limitamos la descripción a 34 caracteres
     const shortDescription = item.description.length > 34
       ? item.description.substring(0, 34) + '...'
       : item.description

     return (
       <div className='StagnantWasteDiv' key={item.id}>
         <p>{item.code} - {item.container} - {item.weight}kg</p>
         <p className='ShortDescription'>{shortDescription}</p>
       </div>
     )
   })}
 </div>
)
}

export default SummaryStatus;