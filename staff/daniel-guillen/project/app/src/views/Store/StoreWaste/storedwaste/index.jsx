import './index.css'
import { useState, useEffect, useCustomContext  } from '../../../../utils/hooks'
import { Button, Title, SubTitle, Text } from '../../../../components/core'
import { WasteSelect, WasteContainer, WasteStatus, WasteWeight, WasteList, MenuStore } from '../../../../components/store'
import { handleWasteChange, handleWeightChange, handleOptionsContainer, handleStatusOptions, handleSubmit } from '../../../../handlers/stored/registerWasteStoredHandlers.js'
import handleDeleteWaste from '../../../../handlers/stored/deleteWasteStoredHandle.js'
import fetchStoredWaste from '../../../../logic/stored/getWasteStored.js'
import getTodayMonthYear from '../../../../utils/getTodayMonthYear.js'

const StoredWaste = () => {
  const token = sessionStorage.getItem('token') 
  const { alert, confirm } = useCustomContext()
  const { month, year } = getTodayMonthYear()
  const [data, setData] = useState([]) 
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null) 
  const [selectedWaste, setSelectedWaste] = useState({ code: '', description: '' })
  const [weight, setWeight] = useState('')
  const [optionsContainer, setOptionsContainer] = useState('')
  const [statusOptions, setStatusOptions] = useState('CORRECTO')

  useEffect(() => {
    fetchStoredWaste(month, year, token, setData, setLoading, setError)
  }, [token, month, year])

  const resetForm = () => {
    setWeight('')
    setOptionsContainer('')
    setStatusOptions('CORRECTO')
  }

  const handleDelete = (id) => {
    confirm({
      message: '🗑️ ¿Deseas eliminar este Residuo? 📦',
      onAccept: () => handleDeleteWaste(id, month, year, token, setData, setLoading, setError, alert),
      onCancel: () => alert('🗑️ Eliminación cancelada ❌'),
    })
  }

  return (
    <div className='Stored'>
      <Title>INVENTARIO {month}/{year}</Title>

      {/* Registro de residuos */}
      <form className='StoreWasteForm' onSubmit={(e) =>
          handleSubmit(e, selectedWaste, weight, optionsContainer, statusOptions, month, year, token, alert, () => {
            fetchStoredWaste(month, year, token, setData, setLoading, setError)
            resetForm()
          })
        }>
          
        <WasteSelect selectedWaste={selectedWaste} handleWasteChange={(selectedOption) => handleWasteChange(selectedOption, setSelectedWaste)} />
        <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={(event) => handleOptionsContainer(event, setOptionsContainer)} />

        <div className={`WeighStatus ${statusOptions}`}>
          
          <WasteWeight weight={weight} handleWeightChange={(event) => handleWeightChange(event, setWeight)} />
          <WasteStatus statusOptions={statusOptions} handleStatusOptions={(event) => handleStatusOptions(event, setStatusOptions)} />
          <Button className={`SubmitButtonWaste ${statusOptions}`} type='submit'>💾</Button>
        </div>
      </form>

      {/* Lista de residuos almacenados */}
      <div>
        {loading ? (
          <Text className="Loading">Cargando datos de residuos...</Text>
        ) : error ? (
          <Text className="Error">Error al cargar los datos: {error}</Text>
        ) : data.length === 0 ? (
          <Text className="Empty">No hay residuos almacenados este mes.</Text>
        ) : (
          <div>
            <SubTitle>Residuos almacenados {month}/{year}</SubTitle>
            <WasteList data={data} onClick={(itemId) => handleDelete(itemId)} />
          </div>
        )}
      </div>

      <MenuStore />
    </div>
  )
}

export default StoredWaste