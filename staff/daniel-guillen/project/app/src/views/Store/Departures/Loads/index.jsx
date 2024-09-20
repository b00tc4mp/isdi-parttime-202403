import { useState, useEffect } from 'react'
import './index.css'
// components
import ReferenceLoad from '../../components/ReferenceLoad'
import WasteSelect from '../../components/WasteSelect'
import WasteContainer from '../../components/WasteContainer'
import WasteWeight from '../../components/WasteWeight'
import SubmitButton from '../../../../components/core/SubmitButton'
import GroupedWasteItem from '../../components/GroupedWasteItem'
import WasteList from '../../components/WasteList/index.jsx'
import MenuLoads from '../../components/MenuLoads'
// handlers
import { handleReferenceChange, handleWasteChange, handleWeightChange, handleOptionsContainer, handleSubmit } from '../../../../handlers/registerWasteLoadHandlers.js'
import handleDeleteWaste from '../../../../handlers/deleteWasteLoadHandle.js'
// utils
import getWeekNumberYear from '../../../../utils/getWeekNumberYear'
import sortWasteItems from '../../../../utils/sortWasteItems'
import groupItemsByCode from '../../../../utils/groupedByCode.js'
// validation
import validateLoadData from '../../../../../../com/validate/validateLoadData.js'
// logic
import fetchLoadWaste from '../../../../logic/getWasteLoad.js'

const Departures = () => {
  const [token] = useState(sessionStorage.getItem('token'))[0] // obtener el token de sessionStorage
  const { week, year } = getWeekNumberYear()
  
  const [reference, setReference] = useState(sessionStorage.getItem('reference'))
  const [data, setData] = useState([])  // almacenar la lista de residuos
  const [loading, setLoading] = useState(false) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores

  const [selectedWaste, setSelectedWaste] = useState({ code: "", description: "" })
  const [weight, setWeight] = useState("")
  const [optionsContainer, setOptionsContainer] = useState("")

  // obtener la lista de residuos solo si hay reference
  useEffect(() => {
    if (reference) {
      setLoading(true)
      fetchLoadWaste(week, year, reference, token, setData, setLoading, setError)
    }
  }, [token, week, year, reference])

  // al hacer onSubmit restablecer los valores por defecto
  const resetForm = () => {
    setWeight("")            // resetear peso
    setOptionsContainer("")   // resetear contenedor
  }

  // agrupamos, mostramos una sola iteración y sumamos el peso total por residuo
  const groupedItemCode = groupItemsByCode(data)

  // ordenamos por código lista resumen
  const filteredItems = groupedItemCode.sort((a, b) => a.code.localeCompare(b.code))

  // ordenamos la lista al detalle
  const sortedList = sortWasteItems(data)

  return (
    <div className='container'>
      <h1 className='RouteTitle'>SALIDAS</h1>

      <div className='Departures'>
        {/* pasamos la referencia y la función de cambio como props */}
        <ReferenceLoad reference={reference} onReferenceChange={handleReferenceChange(setReference)} />
        
        {!reference ? ( // mostramos un mensaje si no hay referencia
          <p style={{ color: 'orange', textAlign: 'center' }}>Por favor, ingresa una referencia antes de continuar.</p>
        ) : (
          <>
            <form className='TruckLoadForm' onSubmit={(e) =>
              handleSubmit(e, selectedWaste, weight, optionsContainer, week, year, reference, token, validateLoadData, () => {
                fetchLoadWaste(week, year, reference, token, setData, setLoading, setError)
                resetForm()  // restablecer los valores acondicionamiento y peso
              })
            }>
              <div className='TruckLoadSelectWaste'>
                <WasteSelect selectedWaste={selectedWaste} handleWasteChange={(selectedOption) => handleWasteChange(selectedOption, setSelectedWaste)} />
              </div>

              <div className='TruckLoadSelectedContainer'>
                <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={(event) => handleOptionsContainer(event, setOptionsContainer)} />
              </div>

              <div className='WeightWeekButtton'>
                <div className='WeightWeek'>
                  <WasteWeight weight={weight} handleWeightChange={(event) => handleWeightChange(event, setWeight)} />
                  <div className='WeekYear'>
                    <p>{week}/{year}</p>
                  </div>
                </div>
                <SubmitButton className='SubmitButtonLoad' type='submit'>💾</SubmitButton>
              </div>
            </form>

            {/* Lista de residuos almacenados */}
            <div>
              {loading ? (
                <p style={{ color: 'orange', textAlign: 'center' }}>Cargando datos de residuos...</p>
              ) : error ? (
                <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
              ) : data.length === 0 ? (
                <p style={{ color: 'white', textAlign: 'center' }}>No hay residuos cargados este mes.</p>
              ) : (
                <div>
                  <h2 className="title">Residuos cargados {reference}</h2>
                  {filteredItems.map(item => (
                    <GroupedWasteItem key={item.code} item={item} />
                  ))}

                  {/* Mostrar la lista completa de residuos */}
                  <h2 className="title">Lista al detalle de residuos</h2>
                  <WasteList data={sortedList} handleDeleteWaste={(id) =>
                    handleDeleteWaste(id, token, week, year, reference, setData, setLoading, setError)} 
                  />
                </div>
              )}
            </div>
          </>
        )}
        <MenuLoads />
      </div>
    </div>
  )
}

export default Departures