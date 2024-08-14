import React, { useState, useEffect } from 'react'
import groupedItemActeco from '../../../../logic/groupedItemActeco'
import View from '../../../../components/core/View'
import GroupedWasteItem from '../../../../components/GroupedWasteItem'
import getWeekNumber from '../../../../logic/getWeekNumber'

const SummaryActeco = () => {

  const groupedItemCode = groupedItemActeco()
  const [week, setWeek] = useState("")

  useEffect(() => {
    const today = new Date()
    setWeek(getWeekNumber(today))
  }, [])

  return (
    <View>
      <div className='SummaryDiv' >
        <h2 className='summaryTitle' >Carga para Acteco Semana {week}:</h2>
          {groupedItemCode.map(item => (
              <GroupedWasteItem key={item.id} item={item} />
          ))}
      </div>
    </View>
  )
}

export default SummaryActeco