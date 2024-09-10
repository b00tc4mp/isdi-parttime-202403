import { useState, useEffect } from 'react'
import Select from 'react-select'
import './index.css'

const ReferenceSelect = ({ selectedReference, handleReferenceChange }) => {
  // Estado para almacenar las referencias
  const [data, setData] = useState([])

  // Función para obtener todas las referencias desde la API
  const fetchReferences = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllReference`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener las referencias')
      }

      const result = await response.json()
      // Formatear los datos para react-select
      const formattedData = result.map((reference) => ({
        value: reference, // Valor que se enviará a la API
        label: `${reference}`, // Texto que se muestra en el select
      }))
      setData(formattedData)
    } catch (error) {
      console.error('Error al obtener las referencias:', error)
    }
  }

  // useEffect para cargar las referencias al montar el componente
  useEffect(() => {
    fetchReferences()
  }, [])

  // Encontrar la opción seleccionada a partir del valor de selectedReference
  const selectedOption = data.find(option => option.value === selectedReference)

  return (
    <div className='ReferenceLoadDiv'>
      <Select
        className='ReferenceSelected'
        id='ReferenceSelect'
        placeholder="REFERENCIA"
        options={data} // Opciones para el select
        value={selectedOption} // Valor actualmente seleccionado
        onChange={(selected) => handleReferenceChange(selected ? selected.value : null)} // Manejar el cambio
        isClearable
      />
    </div>
  )
}

export default ReferenceSelect
