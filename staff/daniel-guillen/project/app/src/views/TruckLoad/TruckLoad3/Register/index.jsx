import React from 'react'
//components
import WasteSelect from '../../../../components/WasteSelect'
import WasteContainer from '../../../../components/WasteContainer'
import WasteWeight from '../../../../components/WasteWeight'
import View from '../../../../components/core/View'
import michelangelo64 from '../../../../components/img/michelangelo64.png'
//handlers
import useWasteSelection from '../../../../handlers/useWasteSelection'
import useWasteContainer from '../../../../handlers/useWasteContainer'
import useWasteWeight from '../../../../handlers/useWasteWeight'
//logic
import useSubmitLoad from '../../../../logic/useSubmitLoad'
import getWeekNumberYear from '../../../../logic/getWeekNumberYear'

const RegisterTruckLoad3 = () => {

  const { selectedWaste, handleWasteChange } = useWasteSelection()
  const { weight, handleWeightChange } = useWasteWeight()
  const { optionsContainer, handleOptionsContainer } = useWasteContainer()
  const { week, year } = getWeekNumberYear()
  const { saveData } = useSubmitLoad('dataTruck3Load', selectedWaste, weight, optionsContainer, week, year)

  return (
    <View>
    <div className='TruckLoadDiv'>
    
    <h1 className='RouteTitle'>CARGA TRAILER 3</h1>
      
      <form className='TruckLoadForm' onSubmit={(e) => { e.preventDefault(); saveData(); }}>
        
        <div className='TruckLoadSelectWaste'>
          
          <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
          
          <button className='SubmitButton' type='submit'><img className='SubmitButtonImage' src={michelangelo64} /></button>
       
        </div>

        <div className='TruckLoadSelectedContainer'>
         
          <WasteContainer optionsContainer={optionsContainer} handleOptionsContainer={handleOptionsContainer} />
        
        </div>

        <div className='WeightWeek'>
          
          <WasteWeight weight={weight} handleWeightChange={handleWeightChange} />
          
          <div className='WeekYearDiv'>

          <p>{week} / {year}</p>
          
          </div>

        </div>

      </form>
      
    </div>
    </View>
  )
}

export default RegisterTruckLoad3
