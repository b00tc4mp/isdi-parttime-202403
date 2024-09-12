import { useState, useEffect } from 'react'
import './index.css'
// utils
import sortWasteItems from '../../../../utils/sortWasteItems'

const SearchWaste = ( { selectedWaste }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // función para traer los residuos almacenados
const fetchStoredWaste = async (selectedWaste) => {
  setLoading(true)
  setError(null)
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}stored/getWasteStored/${month}/${year}/${selectedWaste}`, {
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
  } catch (error) {
    setError(error.message)
    console.error('Error al obtener lista de codigos:', error)
  } finally {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
}

  useEffect(() => {
    if (selectedWaste) {
      fetchStoredWaste(selectedWaste)
    } else {
      setData([]) // Limpiar datos si no hay referencia seleccionada
    }
  }, [selectedWaste])


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
        await fetchStoredWaste(selectedWaste)
      } catch (error) {
        console.error('Error eliminando el residuo:', error)
        setError('Error eliminando el residuo. Inténtalo de nuevo más tarde.')
        alert('Error eliminando el residuo. Inténtalo de nuevo más tarde.')
      }
    } else {
      alert('Eliminación cancelada 🙊')
    }
  }

  // Se renderiza contenido basado en el estado
  if (loading) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Cargando datos de residuos almacenados...</p>
  }

  // mensaje de error
  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos {error}</p>
  }

  // traemos el mes y año actual para el titulo
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  // filtramos y ordenamos residuos
  const sortedList = sortWasteItems(data)

  return (
    <div className='SearchWasteDiv'>
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

export default SearchWaste
