import React from 'react'
//components
import View from '../../../../components/core/View'
import GroupedWasteItem from '../../../../components/GroupedWasteItem'
//logic
import groupedByCode from '../../../../logic/groupedByCode'
import getWeekNumberYear from '../../../../logic/getWeekNumberYear'

const SummaryLoad1 = () => {

  const groupedItems = groupedByCode('dataTruck1Load')
  const { week, year } = getWeekNumberYear()

  // Filtramos los residuos por semana, año actual y ordenamos por codigo
  const filteredItems = groupedItems
    .filter(item => item.week === week && item.year === year)
    .sort((a, b) => a.code.localeCompare(b.code))

  return (
    <View>
      <div className='SummaryDiv' >

        <h2 className='title'>Carga 1 Semana {week}</h2>

          {filteredItems.map(item => (
              <GroupedWasteItem key={item.id} item={item} />
          ))}

      </div>
    </View>
  )
}

export default SummaryLoad1