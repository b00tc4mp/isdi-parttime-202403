import { useState, useEffect } from 'react'
import './index.css'
// Components
import CodeSelect from '../../components/CodeSelect'
import GroupedWasteItem from '../../components/GroupedWasteItem'
import WasteList from '../../components/WasteList'
import MenuStore from '../../components/MenuStore'
// Utils
import sortWasteItems from '../../../../utils/sortWasteItems'
import calculateTotalWeight from '../../../../utils/calculateTotalWeight'
// Logic
import fetchStoredWaste from '../../../../logic/getWasteStoredByCode'
// Handlers
import handleDeleteWaste from '../../../../handlers/deleteWasteStoredHandle'

const Search = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token')) // obtener el token

  const [data, setData] = useState([])  // almacenar la lista de residuos
  const [loading, setLoading] = useState(false) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores
  const [selectedWaste, setSelectedWaste] = useState("")

  const handleCodeChange = (selectedWaste) => {
    setSelectedWaste(selectedWaste)
  }

  // obtener el mes y año actual
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  // traer los residuos almacenados por codigo de residuo
  useEffect(() => {
    if (selectedWaste) {
      setLoading(true)
      fetchStoredWaste(selectedWaste, token, setData, setLoading, setError, month, year)
    } else {
      setData([])
      setLoading(false)
    }
  }, [selectedWaste, token, month, year])

  // filtrar y ordenar residuos
  const sortedList = sortWasteItems(data)

  // calcular el peso total de residuo seleccionado
  const wasteTotalWeight = calculateTotalWeight(data)

  return (
    <div className='container'>
      <h1 className='RouteTitle'>BUSCAR RESIDUO POR</h1>
      <CodeSelect selectedWaste={selectedWaste} handleCodeChange={handleCodeChange}/>

      {/* lista de residuos almacenados */}
      <div>
      {loading ? (
            <p style={{ color: 'orange', textAlign: 'center' }}>Cargando datos de residuos...</p>
          ) : error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
          ) : data.length === 0 ? (
            <p style={{ color: 'white', textAlign: 'center' }}>No hay residuos almacenados este mes.</p>
          ) : (
          <div>
          <h2 className="title">Residuos almacenados {month}/{year}</h2>
            {/* mostrar el residuo agrupado y su peso total */}
            <GroupedWasteItem item={wasteTotalWeight} />

            {/* mostrar la lista completa de residuos */}
            <WasteList data={sortedList} handleDeleteWaste={(id) => handleDeleteWaste(id, token, setData, setLoading, setError)} />
          </div>
        )}
      </div>
    
      <MenuStore />
    </div>
  )
}

export default Search