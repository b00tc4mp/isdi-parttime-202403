import { useState, useEffect } from 'react'
import './index.css'
// components
import Select from 'react-select'
// Logic
import fetchReferencesLoad from '../../../logic/getReferencesLoad'

const ReferenceSelect = ({ selectedReference, handleReferenceChange }) => {
  
  const [data, setData] = useState([]) // Estado para almacenar las referencias

  // useEffect para cargar las referencias
  useEffect(() => {
    const loadReferences = async () => {
      const fetchedData = await fetchReferencesLoad() // obtener todas las referencias guardadas
      setData(fetchedData)
    }
    loadReferences()
  }, [])

  // opción seleccionada a partir del valor de selectedReference
  const selectedOption = data.find(option => option.value === selectedReference)

  return (
    <div className='ReferenceLoadDiv'>
      <Select
        className='ReferenceSelected'
        id='ReferenceSelect'
        placeholder="REFERENCIA"
        options={data} // opciones para el select
        value={selectedOption} // valor actualmente seleccionado
        onChange={(selected) => handleReferenceChange(selected ? selected.value : null)}
        isClearable
      />
    </div>
  )
}

export default ReferenceSelect