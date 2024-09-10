import { useState, useEffect } from 'react'
import './index.css'
// components
import WasteSelect from '../../components/WasteSelect'
import MenuStore from '../../components/MenuStore'
// utils
import sortWasteItems from '../../../../utils/sortWasteItems'

const SearchWaste = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  const [selectedWaste, setSelectedWaste] = useState({ code: "" })

  const handleWasteChange = (selectedOption) => {
    setSelectedWaste(selectedOption)
    console.log("Residuos seleccionados:", selectedOption)
  }

  // función para traer los residuos almacenados
  const fetchStoredWaste = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}stored/getWasteStored/${month}/${year}/${selectedWaste.code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener los datos de cargas')
      }

      const result = await response.json()
      setData(result)
    } catch (error) {
      setError(error.message)
      console.error('Error al obtener los datos de cargas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('selectedWaste:', selectedWaste); // Verificar si hay un código seleccionado
    if (selectedWaste.code) {
      fetchStoredWaste();
    } else {
      setData([]); // Limpiar datos si no hay referencia seleccionada
    }
  }, [selectedWaste.code]);

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
  console.log('data:', data);
  console.log('sortedList:', sortedList);

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
        fetchStoredWaste() // Volver a llamar a la función para actualizar los datos
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

      <h1 className='RouteTitle'>BUSCAR RESIDUO</h1>
      
      <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
      
      {sortedList.length > 0 ? (
        sortedList.map((item) => {
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
