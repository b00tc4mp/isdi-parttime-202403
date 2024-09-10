import { useState, useEffect } from 'react'
import './index.css'
//components
import StagnantWasteItem from './StagnantWasteItem'
//utils
import filterByMonthYear from '../../../../utils/filterByMonthYear'

const SummaryStatus = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // función para traer los residuos almacenados
  const fetchStoredWaste = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}stored/getAllWasteStored`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener los residuos almacenados')
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Llamamos a fetchStoredWaste cuando se monta el componente
    fetchStoredWaste()
  }, [])

  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  // Asegurar que los datos sean un array antes de filtrarlos
  const filteredList = Array.isArray(data) ? filterByMonthYear(data, month, year) : []

  // Filtrar residuos estancados (status = 'ESTANCADO') y ordenar por código
  const stagnantList = filteredList
    .filter(item => item.status === 'ESTANCADO')
    .sort((a, b) => a.code.localeCompare(b.code))

  // Renderizado condicional para carga, error, o lista de residuos estancados
  if (loading) {
    return <p style={{ color: 'green', textAlign: 'center' }}>Cargando datos de residuos estancados...</p>
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
  }

  return (
    <div className='SummaryDiv'>
      <h2 className='title'>Residuos estancados:</h2>
      {stagnantList.length > 0 ? (
        stagnantList.map(item => (
          <StagnantWasteItem key={item.id} item={item} />
        ))
      ) : (
        <p>No hay residuos estancados este mes.</p>
      )}
    </div>
  )
}

export default SummaryStatus
