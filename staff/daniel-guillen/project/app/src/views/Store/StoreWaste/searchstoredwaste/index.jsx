import './index.css'
import { useState, useEffect, useCustomContext } from '../../../../utils/hooks'
import { CodeSelect, GroupedWasteItem, WasteList, MenuStore } from '../../../../components/store'
import { Title, SubTitle, Text } from '../../../../components/core'
import fetchStoredWaste from '../../../../logic/stored/getWasteStoredByCode'
import handleDeleteWaste from '../../../../handlers/stored/deleteWasteStoredSearchHandle.js'
import getTodayMonthYear from '../../../../utils/getTodayMonthYear.js'

const SearchStoredWaste = () => {
  const token = sessionStorage.getItem('token') 
  const { alert, confirm } = useCustomContext()
  const { month, year } = getTodayMonthYear()
  const [data, setData] = useState([])  
  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState(null) 
  const [selectedWaste, setSelectedWaste] = useState("")

  const handleCodeChange = (selectedWaste) => {
    setSelectedWaste(selectedWaste)
  }

  useEffect(() => {
    if (selectedWaste) {
      setLoading(true)
      setTimeout(() => {
        fetchStoredWaste(selectedWaste, month, year, token, setData, setLoading, setError)
      }, 1500)
    }
  }, [selectedWaste, token, month, year])

  const handleDelete = (id) => {
    confirm({
      message: '🗑️ ¿Deseas eliminar este Residuo? 📦',
      onAccept: () => handleDeleteWaste(selectedWaste, month, year, id, token, setData, setLoading, setError, alert),
      onCancel: () => alert('🗑️ Eliminación cancelada ❌'),
    })
  }

  return (
    <div className='SearchWasteDiv'>
      <Title>BUSCAR RESIDUO POR</Title>
      <CodeSelect selectedWaste={selectedWaste} handleCodeChange={handleCodeChange} month={month} year={year} token={token}/>

      {/* lista de residuos almacenados */}
      <div>
        {!selectedWaste ? (
          <Text className="Empty">Seleccione un código de residuo.</Text>
        ) : loading ? (
          <Text className="Loading">Cargando datos de residuos...</Text>
        ) : error ? (
          <Text className="Error">Error al cargar los datos: {error}</Text>
        ) : data.length === 0 ? (
          <Text className="Empty">No hay residuos almacenados este mes.</Text>
        ) : (
          <div>
            <SubTitle>Peso total {month}/{year}</SubTitle>
            <GroupedWasteItem data={data} />
            <SubTitle>Lista al detalle {month}/{year}</SubTitle>
            <WasteList data={data} onClick={(itemId) => handleDelete(itemId)} />
          </div>
        )}
      </div>
      <MenuStore />
    </div>
  )
}

export default SearchStoredWaste