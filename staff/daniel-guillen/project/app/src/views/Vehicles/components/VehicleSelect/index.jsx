import { useState, useEffect } from 'react'
import Select from 'react-select'
import './index.css'

const VehiclesSelect = ({ selectedVehicle, handleVehicleChange }) => {
  // Estado para almacenar las vehiculos
  const [data, setData] = useState([])

  // Función para obtener todas las vehiculos desde la API
  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}vehicles/getAllVehicles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener lista de vehículos')
      }

      const result = await response.json()

      // Formatear los datos para react-select
      const formattedData = result.map((item) => ({        
        value: {
          //value sera un objeto con modelo, matricula y tamaño
          id: item.id,
          model: item.model,
          size: item.size
        },
        label: `${item.model} - ${item.id}`
      }))
      setData(formattedData)
    } catch (error) {
      console.error('Error al obtener lista de vehículos', error)
    }
  }

  // useEffect para cargar las vehiculos al montar el componente
  useEffect(() => {
    fetchVehicles()
  }, [])

  // se mantendra la opcion seleccionada
  const selectedOption = data.find(option => option.value === selectedVehicle)

  return (
    <div className='VehiclesSelectedDiv'>
      <Select
        className='VehiclesSelected'
        id='VehiclesSelect'
        placeholder="LISTA DE VEHÍCULOS"
        options={data} // Opciones para el select
        value={selectedOption} // Valor actualmente seleccionado
        onChange={(selected) => handleVehicleChange(selected ? selected.value : null)} // Manejar el cambio
        isClearable
      />
    </div>
  )
}

export default VehiclesSelect
