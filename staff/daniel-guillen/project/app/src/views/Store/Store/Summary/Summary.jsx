import { useState, useEffect } from 'react'

import './index.css'
//components
import GroupedWasteItem from '../../components/GroupedWasteItem'
//utils
import filterByMonthYear from '../../../../utils/filterByMonthYear'

const SummaryWaste = () => {

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

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  // Filtramos los residuos por mes y año actual
  const groupedList = filterByMonthYear(filteredItems, month, year)

  return (

      <div className='SummaryDiv'>

        <h2 className='title'>Datos resumidos de Residuos:</h2>
        
        {groupedList.map(item => (
          <GroupedWasteItem key={item.id} item={item} />
        ))}
      
      </div>

  );
};

export default SummaryWaste