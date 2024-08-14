import React, { useEffect, useState } from 'react'
import WasteSelect from '../../../../components/WasteSelect'
import useWasteSelection from '../../../../handlers/useWasteSelection'
import WasteContainer from '../../../../components/WasteContainer'
import useWasteContainer from '../../../../handlers/useWasteContainer'
import WasteWeight from '../../../../components/WasteWeight'
import useWasteWeight from '../../../../handlers/useWasteWeight'
import getWeekNumber from '../../../../logic/getWeekNumber'
import submitDataActeco from '../../../../firebase/acteco/submitDataActeco'
import View from '../../../../components/core/View'


const ActecoTruckLoad = () => {

  const { selectedWaste, handleWasteChange } = useWasteSelection()
  const { weight, handleWeightChange } = useWasteWeight()
  const { optionsContainer, handleOptionsContainer } = useWasteContainer()

  const { saveData } = submitDataActeco(selectedWaste, weight, optionsContainer)

  const [week, setWeek] = useState("")
  const [year, setYear] = useState("")

  useEffect(() => {
    const today = new Date()
    setWeek(getWeekNumber(today))
    setYear(today.getFullYear().toString())
  }, [])

  return (
    <View>
    <div className='TruckLoadDiv'>
      <form className='TruckLoadForm' onSubmit={(e) => { e.preventDefault(); saveData(); }}>
        
        <div className='TruckLoadSelectWaste'>
          
          <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
          <button className='SubmitButton' type='submit'>💾</button>
       
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

export default ActecoTruckLoad
