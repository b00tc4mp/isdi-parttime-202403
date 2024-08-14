import React, { useState, useEffect } from 'react'
import groupedItemTruck3 from '../../../../logic/groupedItemTruck3'
import View from '../../../../components/core/View'
import GroupedWasteItem from '../../../../components/GroupedWasteItem'
import getWeekNumber from '../../../../logic/getWeekNumber'

const SummaryLoad3 = () => {

  const groupedItemCode = groupedItemTruck3()
  const [week, setWeek] = useState("")

  useEffect(() => {
    const today = new Date()
    setWeek(getWeekNumber(today))
  }, [])

  return (
    <View>
      <div className='SummaryDiv' >
        <h2 className='summaryTitle' >3a Carga de la Semana {week}:</h2>
          {groupedItemCode.map(item => (
              <GroupedWasteItem key={item.id} item={item} />
          ))}
      </div>
    </View>
  )
}

export default SummaryLoad3