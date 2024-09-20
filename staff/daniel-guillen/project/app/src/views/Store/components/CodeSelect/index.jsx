import { useState, useEffect } from 'react'
import Select from 'react-select'
import './index.css'

const CodeSelect = ({ selectedWaste, handleCodeChange }) => {
  // Estado para almacenar las codigos
  const [data, setData] = useState([])

  // Función para obtener todas las codigos desde la API
  const fetchCode = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}stored/getAllCodesStored`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener lista de codigos')
      }

      const result = await response.json()

      // Formatear los datos para react-select
      const formattedData = result.map((item) => ({        
        value: item.code,
        label: `${item.code} - ${item.description}`
      }))
      setData(formattedData)
    } catch (error) {
      console.error('Error al obtener lista de codigos', error)
    }
  }

  // useEffect para cargar las codigos al montar el componente
  useEffect(() => {
    fetchCode()
  }, [])

  // ordenar opciones por codigo
  const options = data.sort((a, b) => a.value.localeCompare(b.value))

  //  opción seleccionada a partir del valor de selectedCode
  const selectedOption = options.find(option => option.value === selectedWaste)



  return (
    <div className='CodeSelectedDiv'>
      <Select
        className='CodeSelected'
        id='CodeSelect'
        placeholder="CODIGO DE RESIDUO"
        options={options} // opciones para el select
        value={selectedOption} // valor actualmente seleccionado
        onChange={(selected) => handleCodeChange(selected ? selected.value : null)}
        isClearable
      />
    </div>
  )
}

export default CodeSelect