import React, { useState, useEffect } from 'react'
import View from '../../../../components/core/View'
import GroupedWasteItem from '../../../../components/GroupedWasteItem'
import useFetchActecoList from '../../../../firebase/acteco/useFetchActecoList'
import groupedItemsWeek from '../../../../logic/groupedItemsWeek'
import getWeekNumber from '../../../../logic/getWeekNumber'

const SummaryActeco = () => {

  const { list } = useFetchActecoList()
  const groupedItems = groupedItemsWeek(list)
  const [week, setWeek] = useState("")

  useEffect(() => {
    const today = new Date()
    setWeek(getWeekNumber(today))
  }, [])

  return (
    <View>
      <div className='SummaryDiv' >
        <h2 className='summaryTitle' >Carga para Acteco Semana {week}:</h2>
          {groupedItems.map(item => (
              <GroupedWasteItem key={item.id} item={item} />
          ))}
      </div>
    </View>
  )
}

export default SummaryActeco