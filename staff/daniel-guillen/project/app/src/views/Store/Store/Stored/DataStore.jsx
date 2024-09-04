import { useState, useEffect } from 'react'

// utils
import filterByMonthYear from '../../../../utils/filterByMonthYear'
import sortWasteItems from '../../../../utils/sortWasteItems'

const DataStoreList = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // traer residuos almacenados
  const fetchData = async () => {
    try {
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

  // eliminar residuo por ID
  const deleteWaste = async (id) => {
    const isConfirmed = window.confirm('¿Deseas eliminar este residuo? 🙈')

    if (isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}stored/deleteWaste/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Error al eliminar el residuo')
        }

        // mensaje
        alert('Residuo eliminado exitosamente 🎉')

        // prueba de refresco de lista
        fetchData()
      } catch (error) {
        console.error('Error eliminando el residuo:', error)
        setError('Error eliminando el residuo. Inténtalo de nuevo más tarde.')
        alert('Error eliminando el residuo. Inténtalo de nuevo más tarde.')
      }
    } else {
      alert('Eliminación cancelada 🙊')
    }
  }

  // rellamada para refrescar
  useEffect(() => {
    fetchData()
  }, [])

  // filtrado para la lista
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  // cargando...
  if (loading) {
    return <p>Cargando datos de residuos...</p>
  }

  // mensaje de error
  if (error) {
    return <p>Error al cargar los datos: {error}</p>
  }

  // filtramos y ordenamos residuos
  const filteredList = filterByMonthYear(data, month, year)
  const sortedList = sortWasteItems(filteredList)

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
        <p>No hay datos disponibles</p>
      )}
    </div>
  )
}

export default DataStoreList
