import { useState, useEffect } from 'react'

// utils
import sortWasteItems from '../../../../utils/sortWasteItems'

// funcion para traer los residuos almacenados
const fetchStoredWaste = async (setData, setLoading, setError) => {
  try {
    setLoading(true)
    const response = await fetch(`${import.meta.env.VITE_API_URL}stored/getWasteStoredToday`, {
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

const WasteStored = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  // renderizamos la lista de residuos almacenados
  useEffect(() => {
    fetchStoredWaste(setData, setLoading, setError)
  }, [])

  // cargando...
  if (loading) {
    return <p style={{ color: 'orange', textAlign: 'center' }}>Cargando datos de residuos...</p>
  }

  // mensaje de error
  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos {error}</p>
  }

  // ordenamos residuos
  const sortedList = sortWasteItems(data)

  // eliminar residuo por ID
  const deleteWaste = async (id) => {
    const isConfirmed = window.confirm('¿Deseas eliminar este residuo? 🙈')
  
    if (isConfirmed) {
      try {
        const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}stored/deleteWaste/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
  
        if (!apiResponse.ok) {
          throw new Error('Error al eliminar el residuo')
        }
  
        // mensaje
        alert('Residuo eliminado exitosamente 🎉')
  
        // Refrescar la lista después de eliminar un residuo
        await fetchStoredWaste(setData, setLoading, setError)  // Asegúrate de pasar los argumentos aquí
      } catch (error) {
        console.error('Error eliminando el residuo:', error)
        setError('Error eliminando el residuo. Inténtalo de nuevo más tarde.')
        alert('Error eliminando el residuo. Inténtalo de nuevo más tarde.')
      }
    } else {
      alert('Eliminación cancelada 🙊')
    }
  }

  return (
    <div>
      <h2 className="title">Residuos almacenados {month}/{year}</h2>
      {sortedList.length > 0 ? (
        sortedList.map(item => {
          const shortDescription = item.description.length > 34
            ? item.description.substring(0, 34) + '...'
            : item.description

          return (
            // renderizamos residuo con estilos
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

export default WasteStored
