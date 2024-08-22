import React from 'react'
//components
import GroupedWasteItem from '../../../../components/GroupedWasteItem'
//hooks
import groupedByCode from '../../../../utils/groupedByCode'
import getWeekNumberYear from '../../../../utils/getWeekNumberYear'

const SummaryLoad3 = () => {

  const groupedItems = groupedByCode('dataTruck3Load')
  const { week, year } = getWeekNumberYear()

  // Filtramos los residuos por semana, año actual y ordenamos por codigo
  const filteredItems = groupedItems
    .filter(item => item.week === week && item.year === year)
    .sort((a, b) => a.code.localeCompare(b.code))

  return (
 
      <div className='SummaryDiv' >
        <h2 className='title' >Carga 3 Semana {week}:</h2>
          {filteredItems.map(item => (
              <GroupedWasteItem key={item.id} item={item} />
          ))}
      </div>

  )
}

export default SummaryLoad3