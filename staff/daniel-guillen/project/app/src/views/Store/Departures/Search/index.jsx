import { useState, useEffect } from 'react'
import './index.css'
// components
import ReferenceSelect from '../../../../components/store/ReferenceSelect'
import GroupedWasteItem from '../../../../components/store/GroupedWasteItem'
import WasteList from '../../../../components/store/WasteList'
import MenuLoads from '../../../../components/store/MenuLoads'
// utils
import sortWasteItems from '../../../../utils/sortWasteItems'
import groupItemsByCode from '../../../../utils/groupedByCode' // Asegúrate de importar esta función correctamente
// handlers
import handleDeleteWaste from '../../../../handlers/deleteLoadSearchedHandle'
// logic
import fetchLoads from '../../../../logic/getWasteLoadSearched'

const Search = () => {
  const [token] = useState(sessionStorage.getItem('token'))[0] // obtener el token de sessionStorage

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedReference, setSelectedReference] = useState("")

  const handleReferenceChange = (selectedReference) => {
    setSelectedReference(selectedReference)
    console.log("Referencia seleccionada:", selectedReference)
  }

  // obtener la lista de residuos solo si hay referencia
  useEffect(() => {
    if (selectedReference) {
      setLoading(true)
      fetchLoads(selectedReference, token, setData, setLoading, setError)
    } else {
      setData([]) // Limpiar los datos si no hay referencia seleccionada
    }
  }, [token, selectedReference])

  // Agrupar, mostrar una sola iteración y sumar el peso total por código de residuo
  const groupedItemCode = groupItemsByCode(data)
  // Ordenar por código
  const filteredItems = groupedItemCode.sort((a, b) => a.code.localeCompare(b.code))

  // Ordenar lista de residuos al detalle
  const sortedList = sortWasteItems(data)

  return (
    <div className='LoadSearch'>
      <h1 className='RouteTitle'>BUSCAR CARGA POR</h1>
      <ReferenceSelect
        selectedReference={selectedReference}
        handleReferenceChange={handleReferenceChange}
      />
      <div>
          {!selectedReference || data.length === 0 ? (<p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>No hay residuos cargados, selecciona una referencia.</p>
          ) : loading ? (<p style={{ color: 'orange', textAlign: 'center', marginTop: '1rem' }}>Cargando datos de residuos...</p>
          ) : error ? (<p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>Error al cargar los datos: {error}</p>
          ) : (
          <div>
            <h2 className="Title">Resumen residuos cargados</h2>
            {filteredItems.map(item => (
              <GroupedWasteItem key={item.code} item={item} />
            ))}
            <h2 className="Title">Residuos cargados</h2>

            {/* Mostrar la lista completa de residuos */}
            <h2 className="Title">Lista al detalle de residuos</h2>
            <WasteList 
              data={sortedList} 
              handleDeleteWaste={(id) =>
                handleDeleteWaste(id, token, selectedReference, setData, setLoading, setError)} 
            />
          </div>
        )}
      </div>
      <MenuLoads />
    </div>
  )
}

export default Search