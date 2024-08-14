import React from 'react'
import WasteSelect from '../../../components/WasteSelect'
import useWasteSelection from '../../../handlers/useWasteSelection'
import WasteContainer from '../../../components/WasteContainer'
import useWasteContainer from '../../../handlers/useWasteContainer'
import WasteStatus from '../../../components/WasteStatus'
import useWasteStatus from '../../../handlers/useWasteStatus'
import WasteWeight from '../../../components/WasteWeight'
import useWasteWeight from '../../../handlers/useWasteWeight'

import submitDataStoreWaste from '../../../firebase/stored/submitDataStoreWaste'
import View from '../../../components/core/View'
import './index.css'

const Register = () => {

  const { selectedWaste, handleWasteChange } = useWasteSelection()
  const { weight, handleWeightChange } = useWasteWeight()
  const { optionsContainer, handleOptionsContainer } = useWasteContainer()
  const { statusOptions, handleStatusOptions } = useWasteStatus()
  
  const { saveData } = submitDataStoreWaste(selectedWaste, weight, optionsContainer, statusOptions)

  return (
    <View>
    <div className='StoreDiv'>

      <form className='StoreWasteForm' onSubmit={(e) => { e.preventDefault(); saveData(); }}>

        <div className='StoreSelectWaste'>

        <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />

        <button className='SubmitButton' type='submit'>💾</button>

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
    </View>
  )
}

export default Register