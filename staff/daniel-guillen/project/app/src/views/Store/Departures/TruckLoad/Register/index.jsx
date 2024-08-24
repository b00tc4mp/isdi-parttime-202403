import React from 'react'
//components
import WasteSelect from '../../../components/WasteSelect'
import WasteContainer from '../../../components/WasteContainer'
import WasteWeight from '../../../components/WasteWeight'
import michelangelo64 from '../../../../../components/img/michelangelo64.png'
import Button from '../../../../../components/core/Button'
//handlers
import useWasteSelection from '../../../../../handlers/useWasteSelection'
import useWasteContainer from '../../../../../handlers/useWasteContainer'
import useWasteWeight from '../../../../../handlers/useWasteWeight'
//hooks
import useSubmitLoad from '../../../../../hooks/useSubmitLoad'
//utils
import getWeekNumberYear from '../../../../../utils/getWeekNumberYear'

const RegisterTruckLoad = ({ refreshData }) => {

  const { selectedWaste, handleWasteChange } = useWasteSelection()
  const { weight, handleWeightChange } = useWasteWeight()
  const { optionsContainer, handleOptionsContainer } = useWasteContainer()
  const { week, year } = getWeekNumberYear()

  const { saveData } = useSubmitLoad('dataTruck1Load', selectedWaste, weight, optionsContainer, week, year, refreshData)

  return (
    <div className='TruckLoadDiv'>
      <h1 className='RouteTitle'>CARGA TRAILER 1</h1>
      <form className='TruckLoadForm' onSubmit={(e) => { e.preventDefault(); saveData(); }}>
        <div className='TruckLoadSelectWaste'>
          <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
          <Button className='SubmitButton' type='submit'>
            <img className='SubmitButtonImage' src={michelangelo64} alt='Submit' />
          </Button>
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
  )
}

export default RegisterTruckLoad
