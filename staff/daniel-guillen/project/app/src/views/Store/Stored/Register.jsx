import React from 'react'
// Components
import michelangelo64 from '../../../components/img/michelangelo64.png'
import WasteSelect from '../../../components/WasteSelect'
import WasteContainer from '../../../components/WasteContainer'
import WasteStatus from '../../../components/WasteStatus'
import WasteWeight from '../../../components/WasteWeight'
// Handlers
import useWasteSelection from '../../../handlers/useWasteSelection'
import useWasteContainer from '../../../handlers/useWasteContainer'
import useWasteStatus from '../../../handlers/useWasteStatus'
import useWasteWeight from '../../../handlers/useWasteWeight'
// Hooks
import useSubmitWaste from '../../../hooks/useSubmitWaste'

const Register = ({ refreshData }) => {
  
  const { selectedWaste, handleWasteChange } = useWasteSelection()
  const { weight, handleWeightChange } = useWasteWeight()
  const { optionsContainer, handleOptionsContainer } = useWasteContainer()
  const { statusOptions, handleStatusOptions } = useWasteStatus()
  
  const { saveData } = useSubmitWaste('dataStoreWaste', selectedWaste, weight, optionsContainer, statusOptions, refreshData)
  
  return (
    <div className='StoreDiv'>
      <h1 className='RouteTitle'>INVENTARIO</h1>

      <form className='StoreWasteForm' onSubmit={(e) => { e.preventDefault(); saveData(); }}>
        <div className='StoreSelectWaste'>
          <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
          <button className='SubmitButton' type='submit'>
            <img className='SubmitButtonImage' src={michelangelo64} />
          </button>
        </div>
        
        <div className='StoreSelectedContainer'>
          <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={handleOptionsContainer} />
        </div>
        
        <div className='WeightStatus'>
          <WasteWeight weight={weight} handleWeightChange={handleWeightChange} />
          <WasteStatus statusOptions={statusOptions} handleStatusOptions={handleStatusOptions} />
        </div>
      </form>
    </div>
  )
}

export default Register
