import React from 'react'
//components
import View from '../../../../components/core/View'
import GroupedWasteItem from '../../../../components/GroupedWasteItem'
//utils
import groupedByCode from '../../../../utils/groupedByCode'
import getWeekNumberYear from '../../../../utils/getWeekNumberYear'

const SummaryLoad2 = () => {

  const groupedItems = groupedByCode('dataTruck2Load')
  const { week, year } = getWeekNumberYear()

  // Filtramos los residuos por semana, año actual y ordenamos por codigo
  const filteredItems = groupedItems
    .filter(item => item.week === week && item.year === year)
    .sort((a, b) => a.code.localeCompare(b.code))

  return (
    <View>
      <div className='SummaryDiv' >
        <h2 className='title' >Carga 2 Semana {week}:</h2>
          {filteredItems.map(item => (
              <GroupedWasteItem key={item.id} item={item} />
          ))}
      </div>
    </View>
  )
}

export default SummaryLoad2