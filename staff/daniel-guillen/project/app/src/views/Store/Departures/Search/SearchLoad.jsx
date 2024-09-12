// SearchLoad.js
import { useState, useEffect } from 'react'
// utils
import sortWasteItems from '../../../../utils/sortWasteItems'

const SearchLoad = ({ selectedReference }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Función para obtener las cargas basadas en la referencia
  const fetchLoads = async (selectedReference) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}departures/getAllLoads/${selectedReference}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener los datos de cargados')
      }

      const result = await response.json()
      setData(result)
    } catch (error) {
      setError(error.message)
      console.error('Error al obtener los datos de cargas:', error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }

  // useEffect para cargar las cargas cuando cambia la referencia
  useEffect(() => {
    if (selectedReference) {  
      fetchLoads(selectedReference)
    } else {
      setData([]) // Limpiar datos si no hay referencia seleccionada
    }
  }, [selectedReference])

  // Función para eliminar una carga
  const deleteWaste = async (id) => {
    const isConfirmed = window.confirm('¿Deseas eliminar este residuo cargado? 🙈')

    if (isConfirmed) {
      try {
        const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}departures/deleteLoad/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!apiResponse.ok) {
          throw new Error('Error al eliminar residuo cargado')
        }

        alert('Carga eliminada exitosamente 🎉')
        // Refrescar la lista después de eliminar una carga
        fetchLoads(selectedReference)
      } catch (error) {
        console.error('Error eliminando la carga:', error)
        setError('Error eliminando carga. Inténtalo de nuevo más tarde.')
        alert('Error eliminando carga. Inténtalo de nuevo más tarde.')
      }
    } else {
      alert('Eliminación cancelada 🙊')
    }
  }

  // Se renderiza contenido basado en el estado
  if (loading) {
    return <p style={{ color: 'white', textAlign: 'center' }}>📦 📦 📦 📦 📦 📦 📦 📦 📦 📦</p>
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
  }

  const sortedList = sortWasteItems(data)

  return (
    <div>
      <h2 className="title">Residuos cargados</h2>

      {sortedList.length > 0 ? (
        sortedList.map(item => {
          const shortDescription = item.description.length > 34
            ? item.description.substring(0, 34) + '...'
            : item.description

          return (
            <div key={item.id} className='list'>
              <button
                className={`NewWasteDiv ${item.container} ${item.status}`}
                onClick={() => deleteWaste(item.id)}
              >
                <div className='NewWaste'>
                  <p>{item.code} - {item.container} - {item.weight}kg</p>
                  <p className='ShortDescription'>{shortDescription}</p>
                </div>
              </button>
            </div>
          )
        })
      ) : (
        <p style={{ color: 'white', textAlign: 'center' }}>No hay datos disponibles</p>
      )}
    </div>
  )
}

export default SearchLoad
