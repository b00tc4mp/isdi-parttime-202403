import { useState, useEffect } from 'react'
//utils
import getWeekNumberYear from '../../../../utils/getWeekNumberYear'
import sortWasteItems from '../../../../utils/sortWasteItems'

//traemos semana y año actual
const { week, year } = getWeekNumberYear()

// funcion para traer los residuos cargados
const fetchLoads = async (reference, setData, setLoading, setError) => {
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

const WasteLoad = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reference = sessionStorage.getItem('reference')

  // Renderizamos la lista de residuos cargados cuando se cambia la referencia
  useEffect(() => {
    if (reference) {  
      fetchLoads(reference, setData, setLoading, setError)
    }
  }, [reference])

  // Cargando...
  if (loading) {
    return <p style={{ color: 'green', textAlign: 'center' }}>Cargando datos de residuos cargados...</p>
  }

  // Mensaje de error
  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos {error}</p>
  }
  
  // Ordenamos los datos recibidos
  const sortedList = sortWasteItems(data)

  // Eliminar residuo por ID
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

        // Mensaje
        alert('Carga eliminada exitosamente 🎉')

        // Refrescar la lista después de eliminar un residuo
        await fetchLoads()
      } catch (error) {
        console.error('Error eliminando el carga:', error)
        setError('Error eliminando carga. Inténtalo de nuevo más tarde.')
        alert('Error eliminando carga. Inténtalo de nuevo más tarde.')
      }
    } else {
      alert('Eliminación cancelada 🙊')
    }
  }

  return (
    <div>
      <h2 className="title">Residuos cargados</h2>

      {sortedList.length > 0 ? (
        sortedList.map(item => {
          const shortDescription = item.description.length > 34
            ? item.description.substring(0, 34) + '...'
            : item.description

          return (
            // Renderizamos residuo con estilos
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

export default WasteLoad
