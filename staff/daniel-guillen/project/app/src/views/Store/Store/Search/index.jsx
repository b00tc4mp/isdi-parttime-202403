import { useState, useEffect } from 'react'
import './index.css'
// components
import CodeSelect from '../../components/CodeSelect'
import MenuStore from '../../components/MenuStore'
// utils
import sortWasteItems from '../../../../utils/sortWasteItems'

// obtener mes y año actual
const today = new Date()
const month = String(today.getMonth() + 1).padStart(2, '0')
const year = String(today.getFullYear())

// función para traer los residuos almacenados
const fetchStoredWaste = async (code, setData, setLoading, setError) => {
  try {
    setLoading(true)
    const response = await fetch(`${import.meta.env.VITE_API_URL}stored/getWasteStored/${month}/${year}/${code}`, {
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

const SearchWaste = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedWaste, setSelectedWaste] = useState({ code: "" })

  const handleCodeChange = (selectedOption) => {
    setSelectedWaste(selectedOption)
    console.log("Residuo seleccionado:", selectedOption)
  }

  useEffect(() => {
    if (selectedWaste.code) {
      fetchStoredWaste(selectedWaste.code, setData, setLoading, setError)
    }
  }, [selectedWaste.code])

  // cargando...
  if (loading) {
    return <p style={{ color: 'orange', textAlign: 'center' }}>Cargando datos de residuos...</p>
  }

  // mensaje de error
  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
  }

  // filtramos y ordenamos residuos
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
        await fetchStoredWaste(selectedWaste.code, setData, setLoading, setError)
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
    <div className='SearchWasteDiv'>
      <h1 className='RouteTitle'>BUSCAR POR</h1>
      
      <CodeSelect selectedWaste={selectedWaste} handleCodeChange={handleCodeChange} />

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

      <MenuStore />
    </div>
  )
}

export default SearchWaste
