import { useState, useEffect } from 'react'
import getWeekNumberYear from '../../../../utils/getWeekNumberYear'
import GroupedWasteItem from '../../components/GroupedWasteItem'

// Función para traer los residuos cargados
const fetchLoads = async (reference, setData, setLoading, setError) => {

  const { week, year } = getWeekNumberYear()


  try {
    setLoading(true)
    
    // Agregar referencia dinámica a la URL
    const response = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllLoads/${week}/${year}/${reference}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener las cargas almacenadas')
    }

    const result = await response.json()
    setData(result)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

const GroupedByCode = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const reference = sessionStorage.getItem('reference')

  // Renderizamos la lista de residuos cargados cuando se cambia la referencia
  useEffect(() => {
    if (reference) {  // Solo hacer fetch si hay una referencia válida
      fetchLoads(reference, setData, setLoading, setError)
    }
  }, [reference])

  // Cargando...
  if (loading) {
    return <p style={{ color: 'green', textAlign: 'center' }}>Cargando datos resumindos de residuos cargados...</p>
  }

  // Mensaje de error
  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
  }

  // Agrupar, mostrar una sola iteración y sumar el peso total por código
  const groupedItemCode = data.reduce((acc, item) => {
    const existingItemCode = acc.find(i => i.code === item.code)
    if (existingItemCode) {
      existingItemCode.totalWeight += parseFloat(item.weight)
    } else {
      acc.push({ ...item, totalWeight: parseFloat(item.weight) })
    }
    return acc
  }, [])

  // ordenamos por código
  const filteredItems = groupedItemCode.sort((a, b) => a.code.localeCompare(b.code))

  // Renderizamos los elementos agrupados
  return (
    <div>
      
      <h2 className="title">Resumen residuos cargados</h2>

      {filteredItems.map(item => (

      <GroupedWasteItem key={item.id} item={item} />
      
      ))}

    </div>
  )
}

export default GroupedByCode
