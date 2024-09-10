// GroupedByCode.js
import { useState, useEffect } from 'react'
import GroupedWasteItem from '../../components/GroupedWasteItem'

const GroupedByCode = ({ selectedReference }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Función para obtener los datos agrupados basados en la referencia
  const fetchGroupedLoads = async (reference) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllLoads/${reference}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener los datos agrupados')
      }

      const result = await response.json()
      setData(result)
    } catch (error) {
      setError(error.message)
      console.error('Error al obtener los datos agrupados:', error)
    } finally {
      setLoading(false)
    }
  }

  // useEffect para cargar los datos agrupados cuando cambia la referencia
  useEffect(() => {
    if (selectedReference) {  
      fetchGroupedLoads(selectedReference)
    } else {
      setData([]) // Limpiar datos si no hay referencia seleccionada
    }
  }, [selectedReference])

  // Renderizar contenido basado en el estado
  if (loading) {
    return <p style={{ color: 'green', textAlign: 'center' }}>Cargando datos resumidos de residuos cargados...</p>
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
  }

  // Agrupar y sumar el peso total por código
  const groupedItemCode = data.reduce((acc, item) => {
    const existingItemCode = acc.find(i => i.code === item.code)
    if (existingItemCode) {
      existingItemCode.totalWeight += parseFloat(item.weight)
    } else {
      acc.push({ ...item, totalWeight: parseFloat(item.weight) })
    }
    return acc
  }, [])

  // Ordenar por código
  const filteredItems = groupedItemCode.sort((a, b) => a.code.localeCompare(b.code))

  return (
    <div>
      <h2 className="title">Resumen residuos cargados</h2>

      {filteredItems.length > 0 ? (
        filteredItems.map(item => (
          <GroupedWasteItem key={item.id} item={item} />
        ))
      ) : (
        <p style={{ color: 'white', textAlign: 'center' }}>No hay datos disponibles</p>
      )}
    </div>
  )
}

export default GroupedByCode
