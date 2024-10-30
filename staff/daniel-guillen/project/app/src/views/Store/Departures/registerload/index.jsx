import './index.css'
import { useState, useEffect, useCustomContext } from '../../../../utils/hooks'
import { Button, Title, SubTitle, Text } from '../../../../components/core'
import { ReferenceLoad, WasteSelect, WasteContainer, WasteWeight, GroupedWasteItem, WasteList, MenuLoads } from '../../../../components/store'
import { handleReferenceChange, handleWasteChange, handleWeightChange, handleOptionsContainer, handleSubmit } from '../../../../handlers/departures/registerWasteLoadHandlers.js'
import handleDeleteWaste from '../../../../handlers/departures/deleteWasteLoadHandle.js'
import fetchLoadWaste from '../../../../logic/departures/getWasteLoad.js'
import getWeekNumberYear from '../../../../utils/getWeekNumberYear'

const RegisterLoad = () => {
  const token = sessionStorage.getItem('token') 
  const { alert, confirm } = useCustomContext() 
  const { week, year } = getWeekNumberYear()
  const [data, setData] = useState([])  
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null) 
  const [reference, setReference] = useState(sessionStorage.getItem('reference'))
  const [selectedWaste, setSelectedWaste] = useState({ code: "", description: "" })
  const [weight, setWeight] = useState("")
  const [optionsContainer, setOptionsContainer] = useState("")

  useEffect(() => {
    if (reference) {
      fetchLoadWaste(week, year, reference, token, setData, setLoading, setError)
    }
  }, [token, week, year, reference])


  const resetForm = () => {
    setWeight("")            
    setOptionsContainer("")   
  }

  const handleDelete = (id) => {
    confirm({
      message: '🗑️ ¿Deseas eliminar esta Carga? 📦',
      onAccept: () => handleDeleteWaste(id, token, week, year, reference, setData, setLoading, setError, alert),
      onCancel: () => alert('🗑️ Eliminación cancelada ❌'),
    })
  }

  return (
    <div className='Departures'>
      <Title>SALIDAS</Title>
      {/* pasamos la referencia */}
      <ReferenceLoad reference={reference} onReferenceChange={handleReferenceChange(setReference)} />
      
      {!reference ? (
        <Text className="Empty">Por favor, ingresa una referencia antes de continuar.</Text>
      ) : (
        <>{/* registro de carga */}
          <form className='TruckLoadForm' onSubmit={(e) =>
            handleSubmit(e, selectedWaste, weight, optionsContainer, week, year, reference, token, alert, () => {
                fetchLoadWaste(week, year, reference, token, setData, setLoading, setError)
                resetForm()
              })
            }>
            <WasteSelect selectedWaste={selectedWaste} handleWasteChange={(selectedOption) => handleWasteChange(selectedOption, setSelectedWaste)} />
            <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={(event) => handleOptionsContainer(event, setOptionsContainer)} />
            
            <div className='WeightWeekButtton'>
              <WasteWeight weight={weight} handleWeightChange={(event) => handleWeightChange(event, setWeight)} /> 
            <div className='WeekYear'>
                <Text>{week}/{year}</Text>
            </div>            
              <Button className='SubmitButtonLoad' type='submit'>💾</Button>
            </div>
          </form>

            <div> {/* Lista de residuos cargados */}
              {loading ? (
                <Text className="Loading">Cargando datos de residuos...</Text>
              ) : error ? (
                <Text className="Error">{error}</Text>
              ) : data.length === 0 ? (
                <Text className="Empty">No hay residuos cargados este mes.</Text>
              ) : (
                <div>
                  <SubTitle>Residuos cargados {reference}</SubTitle>
                  <GroupedWasteItem data={data} />
                  <SubTitle>Residuos cargados al detalle</SubTitle>
                  <WasteList data={data} onClick={(itemId) => handleDelete(itemId)} />
                </div>
              )}
            </div>
        </>
      )}
      <MenuLoads />
    </div>
  )
}

export default RegisterLoad