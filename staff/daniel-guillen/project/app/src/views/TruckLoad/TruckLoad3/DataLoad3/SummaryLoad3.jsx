import React, { useState, useEffect } from 'react'
import View from '../../../../components/core/View'
import GroupedWasteItem from '../../../../components/GroupedWasteItem'
import useFetchTruck3List from '../../../../firebase/truck3/useFetchTruck3List'
import groupedItemsWeek from '../../../../logic/groupedItemsWeek'
import getWeekNumber from '../../../../logic/getWeekNumber'

const SummaryLoad3 = () => {

  const { list } = useFetchTruck3List()
  const groupedItems = groupedItemsWeek(list)
  const [week, setWeek] = useState("")

  useEffect(() => {
    const today = new Date()
    setWeek(getWeekNumber(today))
  }, [])

  return (
    <View>
      <div className='SummaryDiv' >
        <h2 className='summaryTitle' >3a Carga de la Semana {week}:</h2>
          {groupedItems.map(item => (
              <GroupedWasteItem key={item.id} item={item} />
          ))}
      </div>
    </View>
  )
}

export default SummaryLoad3