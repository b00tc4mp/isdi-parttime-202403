import { useState, useEffect } from 'react'
import './index.css'
// Components
import CodeSelect from '../../../../components/store/CodeSelect'
import GroupedWasteItem from '../../../../components/store/GroupedWasteItem'
import WasteList from '../../../../components/store/WasteList'
import MenuStore from '../../../../components/store/MenuStore'
// Utils
import useAuthRedirect from '../../../../utils/noTokenRedirect'
import sortWasteItems from '../../../../utils/sortWasteItems'
import calculateTotalWeight from '../../../../utils/calculateTotalWeight'
// Logic
import fetchStoredWaste from '../../../../logic/getWasteStoredByCode'
// Handlers
import handleDeleteWaste from '../../../../handlers/deleteWasteStoredHandle'

const Search = () => {
  // const [token] = useState(sessionStorage.getItem('token')) // obtener el token de sessionStorage
  const token = useAuthRedirect() // si no hay token redirigir a login

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
      setTimeout(() => {
        fetchStoredWaste(selectedWaste, token, setData, setLoading, setError, month, year)
      }, 1500)
    }
  }, [selectedWaste, token, month, year])

  // filtrar y ordenar residuos
  const sortedList = sortWasteItems(data)

  // calcular el peso total de residuo seleccionado
  const wasteTotalWeight = calculateTotalWeight(data)

  return (
    <div className='SearchWasteDiv'>
      <h1 className='RouteTitle'>BUSCAR RESIDUO POR</h1>
      <CodeSelect selectedWaste={selectedWaste} handleCodeChange={handleCodeChange} />

      {/* lista de residuos almacenados */}
      <div>
        {!selectedWaste ? (
          <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>Seleccione un código de residuo.</p>
        ) : loading ? (
          <p style={{ color: 'orange', textAlign: 'center', marginTop: '1rem' }}>Cargando datos de residuos...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>Error al cargar los datos: {error}</p>
        ) : data.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>No hay residuos almacenados este mes.</p>
        ) : (
          <div>
            <h2 className="Title">Peso total {month}/{year}</h2>
            {/* mostrar el residuo agrupado y su peso total */}
            <GroupedWasteItem item={wasteTotalWeight} />
            <h2 className="Title">Lista al detalle {month}/{year}</h2>
            {/* mostrar la lista completa de residuos */}
            <WasteList 
              data={sortedList} 
              handleDeleteWaste={(id) => handleDeleteWaste(id, token, setData, setLoading, setError)} 
            />
          </div>
        )}
      </div>

      <MenuStore />
    </div>
  )
}

export default Search