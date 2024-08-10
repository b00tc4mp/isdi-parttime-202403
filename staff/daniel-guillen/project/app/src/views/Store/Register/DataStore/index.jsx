import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc  } from 'firebase/firestore'
import { db } from "../../../../firebase/config"
import './index.css'

const DataStoreList = () => {

  const [list, setList] = useState([])

  //solicitar y renderizamos lista de residuos guardados
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

  //funcion para eliminar residuos insertados

  const deleteWaste = async(id) => {
    const isConfirmed = window.confirm('¿Deseas eliminar este residuo? 🙈')
  
    if (isConfirmed) {
      await deleteDoc(doc(db, 'dataStoreWaste', id))
      alert("Residuo eliminado exitosamente 🎉")
      window.location.reload()
    } else {
      alert("Eliminación cancelada 🙊")
    }
  }

  return (
        <div className='DataStoreWasteDiv'>
          <h2 className='DataStoreTitle'>Lista de Residuos:</h2>
        {
        list
          //El metodo sort() ordenara los campos de un array localmente (localeComapre) y devuelve el arreglo ordenado
          .sort((a, b) => {
            // comparamos LER
            const codeComparison = a.code.localeCompare(b.code)
            if (codeComparison !== 0) return codeComparison
    
            // comparamos acondicionamiento
            const containerComparison = b.container.localeCompare(a.container)
            if (containerComparison !== 0) return containerComparison
    
            // comparamos peso
            return b.weight - a.weight
          })
          .map((item, index, array) => {
            // Limitamos la descripción a 34 caracteres
            const shortDescription = item.description.length > 34
              ? item.description.substring(0, 34) + '...'
              : item.description;
      
            // Verificamos si cambia item.code para añadir un <div>
            const isCodeDifferent = index === 0 || item.code !== array[index - 1].code;
      
            return (
              <React.Fragment key={item.id}>
                {isCodeDifferent && <div></div>}
                <button 
                  className={`NewWasteDiv ${item.container} ${item.status}`}
                  onClick={() => deleteWaste(item.id)}
                >
                  <div className='NewWaste' >
                  <p>{item.code} - {item.container} - {item.weight}kg</p>
                  <p className='ShortDescription'>{shortDescription}</p>
                  </div>
                </button>
              </React.Fragment>
            );
          })}
        </div>
  );
};

export default DataStoreList
