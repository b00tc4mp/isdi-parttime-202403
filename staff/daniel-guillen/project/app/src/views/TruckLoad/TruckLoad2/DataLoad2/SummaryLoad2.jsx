import React, { useState, useEffect } from 'react'
import View from '../../../../components/core/View'
import GroupedWasteItem from '../../../../components/GroupedWasteItem'
import useFetchTruck2List from '../../../../firebase/truck2/useFetchTruck2List'
import groupedItemsWeek from '../../../../logic/groupedItemsWeek'
import getWeekNumber from '../../../../logic/getWeekNumber'

const SummaryLoad2 = () => {

  const { list } = useFetchTruck2List()
  const groupedItems = groupedItemsWeek(list)
  const [week, setWeek] = useState("")

  useEffect(() => {
    const today = new Date()
    setWeek(getWeekNumber(today))
  }, [])

  return (
    <View>
      <div className='SummaryDiv' >
        <h2 className='summaryTitle' >2a Carga de la Semana {week}:</h2>
          {groupedItems.map(item => (
              <GroupedWasteItem key={item.id} item={item} />
          ))}
      </div>
    </View>
  )
}

export default SummaryLoad2