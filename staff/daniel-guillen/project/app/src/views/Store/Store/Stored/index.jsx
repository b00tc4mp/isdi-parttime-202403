import { useState, useEffect } from 'react'
import './index.css'
// Components
import Button from '../../../../components/core/Button'
import WasteSelect from '../../../../components/store/WasteSelect'
import WasteContainer from '../../../../components/store/WasteContainer'
import WasteStatus from '../../../../components/store/WasteStatus'
import WasteWeight from '../../../../components/store/WasteWeight'
import WasteList from '../../../../components/store/WasteList/index.jsx'
import MenuStore from '../../../../components/store/MenuStore'
// Logic
import createWaste from '../../../../logic/createWaste'
import fetchStoredWaste from '../../../../logic/getWasteStored.js'
import validateWasteData from 'com/validate/validateWasteData'
// Handlers
import { handleWasteChange, handleWeightChange, handleOptionsContainer, handleStatusOptions, handleSubmit } from '../../../../handlers/registerWasteStoredHandlers.js'
import handleDeleteWaste from '../../../../handlers/deleteWasteStoredHandle.js'

const Stored = () => {
  const [token] = useState(sessionStorage.getItem('token'))[0] // obtener el token de sessionStorage
  
  const [data, setData] = useState([])  // almacenar la lista de residuos
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores

  const [selectedWaste, setSelectedWaste] = useState({ code: "", description: "" })
  const [weight, setWeight] = useState("")
  const [optionsContainer, setOptionsContainer] = useState("")
  const [statusOptions, setStatusOptions] = useState("CORRECTO")

  // obtener la lista de residuos del servidor
  useEffect(() => {
  // llamamos a fetchStoredWaste cuando se monta el componente
    fetchStoredWaste(token, setData, setLoading, setError)
  }, [token])

  // onsumit restablecer los valores por defecto
  const resetForm = () => {
    setWeight("")            // resetear peso
    setOptionsContainer("")   // resetear contenedor
    setStatusOptions("CORRECTO")  // resetear estado a "CORRECTO"
  }

  return (
    <div className='Stored'>
      <h1 className='RouteTitle'>INVENTARIO</h1>

        {/* Registro de residuos */}
        <form className='StoreWasteForm' onSubmit={(e) =>
          handleSubmit(e, selectedWaste, weight, optionsContainer, statusOptions, createWaste, token, validateWasteData, () => {
            fetchStoredWaste(token, setData, setLoading, setError)
            resetForm()  // restablecer los valores acondicionamiento, peso y estado 
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
          <p style={{ color: 'orange', textAlign: 'center', marginTop: '1rem' }}>Cargando datos de residuos...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>Error al cargar los datos: {error}</p>
        ) : data.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}>No hay residuos almacenados este mes.</p>
        ) : (
          <div>
          <h2 className="Title">Residuos almacenados</h2>

          <WasteList data={data} handleDeleteWaste={(id) => handleDeleteWaste(id, token, setData, setLoading, setError)} />
          </div>
        )}
      </div>

      <MenuStore />
    </div>
  )
}

export default Stored