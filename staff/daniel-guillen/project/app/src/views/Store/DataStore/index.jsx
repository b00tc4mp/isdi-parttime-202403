import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc  } from 'firebase/firestore'
import { db } from "../../../firebase/config"
import './index.css'

const DataStoreList = () => {

  const [list, setList] = useState([])

  //renderizamos lista de residuos
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
          .map(list => {
            // Limitamos la descripcion a 24 caracteres
            const shortDescription = list.description.length > 24
              ? list.description.substring(0, 24) + '...' 
              : list.description
    
            return (
              <button className={`NewWaste ${list.container} ${list.status}`} key={list.id}
                onClick={() =>deleteWaste(list.id)} >
                  <p>{list.code} - {list.container} - {list.weight} kg</p>
                  <p>{shortDescription}</p>
              </button>
            )
          })
      }
        </div>
  );
};

export default DataStoreList
