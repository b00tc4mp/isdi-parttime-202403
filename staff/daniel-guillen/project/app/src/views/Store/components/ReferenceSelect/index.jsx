import { useState, useEffect } from 'react'
import Select from 'react-select'
import './index.css'
import getWeekNumberYear from '../../../../utils/getWeekNumberYear'

const ReferenceSelect = ({ selectedReference, handleReferenceChange }) => {

  const { week, year } = getWeekNumberYear()

  // Variable de estado para almacenar los datos de las referencias
  const [data, setData] = useState([])

  // Función para obtener todas las referencias desde la API
  const fetchLoads = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllReference`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener las cargas almacenadas')
      }

      const result = await response.json()
      // Formatear los datos para que sean compatibles con react-select
      const formattedData = result.map((reference) => ({
        value: reference, // valor que enviamos a la API
        label: `${reference}`, // texto que se muestra en el select
      }))
      setData(formattedData)
    } catch (error) {
      console.error('Error al obtener las referencias:', error)
    }
  }

  // useEffect para cargar los datos una vez que el componente se monta
  useEffect(() => {
    fetchLoads()
  }, []) // Solo se ejecuta una vez al montarse el componente

  // Encontrar la opción seleccionada a partir del valor de selectedReference
  const selectedOption = data.find(option => option.value === selectedReference.reference)

  return (
    <div className='ReferenceLoadDiv'>
      <Select
        className='ReferenceSelected'
        id='ReferenceSelect'
        placeholder="REFERENCIA"
        options={data} // opciones para el select
        value={selectedOption} // valor actual seleccionado
        onChange={(selected) => handleReferenceChange(selected ? selected.value : null)} // manejar el cambio
        isClearable
      />

      <div className='WeekYearDiv'>
        <p>{week} / {year}</p>
      </div>
    </div>
  )
}

export default ReferenceSelect
