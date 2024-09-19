import { useState, useEffect } from 'react'
import './index.css'
// components
import CodeSelect from '../../components/CodeSelect'
import GroupedWasteItem from '../../components/GroupedWasteItem'
import WasteList from '../../components/WasteList'
import MenuStore from '../../components/MenuStore'
// Utils
import sortWasteItems from '../../../../utils/sortWasteItems'
import calculateTotalWeight from '../../../../utils/calculateTotalWeight'
// Logic
import deleteWasteById from '../../../../logic/deleteWaste'
import fetchStoredWaste from '../../../../logic/getWasteStoredByCode'

const Search = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token')) // obtener el token

  const [data, setData] = useState([])  // almacenar la lista de residuos
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores
  const [selectedWaste, setSelectedWaste] = useState("")

  const handleCodeChange = (selectedWaste) => {
    setSelectedWaste(selectedWaste)
    console.log("Residuo seleccionado:", selectedWaste)
  }

  // obtener el mes y año actual
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  // traer los residuos almacenados por codigo de residuo
  useEffect(() => {
    if (selectedWaste) {
      fetchStoredWaste(selectedWaste, token, setData, setLoading, setError, month, year)
    } else {
      setData([]) // limpiar datos si no hay referencia seleccionada
      setLoading(false)
    }
  }, [selectedWaste])

  // eliminar residuo por ID
  const handleDeleteWaste = async (id) => {
    const isConfirmed = window.confirm('🗑️ ¿Deseas eliminar este residuo? 📦')

    if (isConfirmed) {
      try {
        await deleteWasteById(id, token)  // Pasamos el token al eliminar residuo
        alert('📦 Residuo eliminado exitosamente 🎉')

        // refrescar la lista despues de eliminar un residuo
        fetchStoredWaste(selectedWaste)
      } catch (error) {
        console.error('Error eliminando el residuo:', error)
        alert(error.message)
      }
    } else {
      alert('🗑️ Eliminación cancelada ❌')
    }
  }

  // cargando...
  if (loading) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Cargando datos de residuos almacenados...</p>
  }

  // error...
  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
  }

  // filtrar y ordenar residuos
  const sortedList = sortWasteItems(data)

  // calcular el peso total de residuo seleccionado
  const wasteTotalWeight = calculateTotalWeight(data)

  return (
    <div className='container'>
      <h1 className='RouteTitle'>BUSCAR RESIDUO POR</h1>
      <CodeSelect selectedWaste={selectedWaste} handleCodeChange={handleCodeChange}/>

      {/* Lista de residuos almacenados */}
      <div>
        {data.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center' }}>No hay residuos almacenados este mes.</p>
        ) : (
          <>
            <h2 className="title">Residuos almacenados {month}/{year}</h2>
            
            {/* Mostrar el residuo agrupado y su peso total */}
            <GroupedWasteItem item={wasteTotalWeight} />

            {/* Mostrar la lista completa de residuos */}
            <WasteList data={sortedList} handleDeleteWaste={handleDeleteWaste} />
          </>
        )}
      </div>
    
      <MenuStore />
    </div>
  )
}

export default Search