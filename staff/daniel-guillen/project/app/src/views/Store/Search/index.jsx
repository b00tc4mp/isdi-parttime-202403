import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc  } from 'firebase/firestore'
import { db } from "../../../firebase/config"
import WasteSelect from '../../../components/WasteSelect'
import MenuStore from '../MenuStore'
import './index.css'

const SearchWaste = () => {
    
    const [selectedWaste, setSelectedWaste] = useState("")

    // Maneja el cambio de SelectedWaste
    const handleWasteChange = (selectedOption) => {
        setSelectedWaste(selectedOption)
        console.log("Selected waste:", selectedOption)
      }

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

    // Filtramos los residuos por selectedWaste.code
    const filteredList = list.filter(item => item.code === selectedWaste.code)

  return (
    <div className='SearchWasteDiv'>
      <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
      <h2 className='DataWasteTitle' >Resultados...</h2>
      {
        filteredList
          .sort((a, b) => {
            // Comparamos el acondicionamiento
            const containerComparison = b.container.localeCompare(a.container)
            if (containerComparison !== 0) return containerComparison

            // Comparamos el peso
            return b.weight - a.weight
          })
          .map((item) => {
            // Limitamos la descripcion a 34 caracteres
            const shortDescription = item.description.length > 34
              ? item.description.substring(0, 34) + '...'
              : item.description

            return (
              <button
                key={item.id}
                className={`NewWasteDiv ${item.container} ${item.status}`}
                onClick={() => deleteWaste(item.id)} // Asegúrate de definir la función deleteWaste si es necesaria
              >
                <div className='NewWaste'>
                  <p>{item.code} - {item.container} - {item.weight}kg</p>
                  <p className='ShortDescription'>{shortDescription}</p>
                </div>
              </button>
            )
          })
      }
      <MenuStore />
    </div>
  )
}

export default SearchWaste