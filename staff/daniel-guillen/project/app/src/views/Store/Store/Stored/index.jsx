import { useState, useEffect } from 'react'
import './index.css'
// Components
import Button from '../../../../components/core/Button'
import WasteSelect from '../../components/WasteSelect'
import WasteContainer from '../../components/WasteContainer'
import WasteStatus from '../../components/WasteStatus'
import WasteWeight from '../../components/WasteWeight'
import WasteList from '../../components/WasteList/index.jsx'
import MenuStore from '../../components/MenuStore'
// Logic
import createWaste from '../../../../logic/createWaste'
import deleteWasteById from '../../../../logic/deleteWaste'
import fetchStoredWaste from '../../../../logic/getWasteStored.js'
import validateWasteData from 'com/validate/validateWasteData'
// Handlers
import { handleWasteChange, handleWeightChange, handleOptionsContainer, handleStatusOptions, handleSubmit } from '../../../../handlers/RegisterWasteStoredHandlers.js'

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

  // eliminar residuo por ID
  const handleDeleteWaste = async (id) => {
    const isConfirmed = window.confirm('🗑️ ¿Deseas eliminar este residuo? 📦')

    if (isConfirmed) {
      try {
        await deleteWasteById(id, token)  // pasamos el token al eliminar residuo
        alert('📦 Residuo eliminado exitosamente 🎉')

        // refrescar la lista después de eliminar un residuo
        fetchStoredWaste(token, setData, setLoading, setError)
      } catch (error) {
        console.error('Error eliminando el residuo:', error)
        alert(error.message)
      }
    } else {
      alert('🗑️ Eliminación cancelada ❌')
    }
  }

  // onsumit restablecer los valores por defecto
  const resetForm = () => {
    setWeight("")            // resetear peso
    setOptionsContainer("")   // resetear contenedor
    setStatusOptions("CORRECTO")  // resetear estado a "CORRECTO"
  }

  return (
    <div className='container'>
      <h1 className='RouteTitle'>INVENTARIO</h1>

        {/* Registro de residuos */}
        <form className='StoreWasteForm' onSubmit={(e) =>
          handleSubmit(e, selectedWaste, weight, optionsContainer, statusOptions, createWaste, token, validateWasteData, () => {
            fetchStoredWaste(token, setData, setLoading, setError)
            resetForm()  // restablecer los valores acondicionamiento, peso y estado 
          })
        }>
        
        <div className='StoreSelectWaste'>  
          <WasteSelect selectedWaste={selectedWaste} handleWasteChange={(selectedOption) => handleWasteChange(selectedOption, setSelectedWaste)} />
          <Button className='SubmitButtonWaste' type='submit'>💾</Button>
        </div>

        <div className='StoreSelectedContainer'>
          <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={(event) => handleOptionsContainer(event, setOptionsContainer)} />
        </div>

        <div className={`WeighStatusButtton ${statusOptions}`}>
          <WasteWeight weight={weight} handleWeightChange={(event) => handleWeightChange(event, setWeight)} />
          <WasteStatus statusOptions={statusOptions} handleStatusOptions={(event) => handleStatusOptions(event, setStatusOptions)} />
        </div>
      </form>

        {/* Lista de residuos almacenados */}
      <div>
        
        {loading ? (
          <p style={{ color: 'orange', textAlign: 'center' }}>Cargando datos de residuos...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
        ) : data.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center' }}>No hay residuos estancados este mes.</p>
        ) : (
          <div>
          <h2 className="title">Residuos almacenados</h2>

          <WasteList data={data} handleDeleteWaste={handleDeleteWaste} />
          </div>
        )}
      </div>

      <MenuStore />
    </div>
  )
}

export default Stored