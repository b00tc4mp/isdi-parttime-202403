import './index.css'
import { useState, useEffect, useCustomContext } from '../../../../utils/hooks'
import { Title, SubTitle, Text } from '../../../../components/core'
import { ReferenceSelect, GroupedWasteItem, WasteList, MenuLoads } from '../../../../components/store'
import handleDeleteWaste from '../../../../handlers/departures/deleteWasteLoadHandle'
import fetchLoadWaste from '../../../../logic/departures/getWasteLoad'

const SearchDepartures = () => {
  const token = sessionStorage.getItem('token') 
  const { alert, confirm } = useCustomContext() 
  const [data, setData] = useState([]) 
  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState(null) 
  const [selectedReference, setSelectedReference] = useState(null)

  const handleReferenceChange = (referenceObj) => {
    setSelectedReference(referenceObj)
  }

  useEffect(() => {
    if (selectedReference) {
      const { week, year, reference } = selectedReference
      setLoading(true)
      fetchLoadWaste(week, year, reference, token, setData, setLoading, setError)
    } else {
      setData([])
    }
  }, [token, selectedReference])

  const handleDelete = (id) => {
    const { week, year, reference } = selectedReference
    confirm({
      message: '🗑️ ¿Deseas eliminar esta Carga? 📦',
      onAccept: () => handleDeleteWaste(id, token, week, year, reference, setData, setLoading, setError, alert),
      onCancel: () => alert('🗑️ Eliminación cancelada ❌'),
    })
  }

  return (
    <div className='LoadSearch'>
      <Title>BUSCAR CARGA POR</Title>
      <ReferenceSelect selectedReference={selectedReference} handleReferenceChange={handleReferenceChange} />
      <div> {/* Lista de residuos cargados */}
          {!selectedReference ? (
            <Text className="Empty">Seleccione una referencia.</Text>
          ) : loading ? (
            <Text className="Loading">Cargando datos de residuos...</Text>
          ) : error ? (
            <Text className="Error">Error al cargar los datos: {error}</Text>
          ) : data.length === 0 ? (
            <Text className="Empty">No hay residuos almacenados esta referencia</Text>
          ) : (
          <div>
            <SubTitle>Resumen residuos cargados</SubTitle>    
            <GroupedWasteItem data={data} />
            <SubTitle>Lista al detalle de residuos</SubTitle>
            <WasteList data={data} onClick={(itemId) => handleDelete(itemId)} />
          </div>
        )}
      </div>
      <MenuLoads />
    </div>
  )
}

export default SearchDepartures