import React from 'react'
import './index.css'
//components
import GroupedWasteItem from '../../../components/GroupedWasteItem'
import View from '../../../components/core/View'
//logic
import groupedByCode from '../../../logic/groupedByCode'
import filterByMonthYear from '../../../logic/filterByMonthYear'

const SummaryWaste = () => {

  const groupedItems = groupedByCode('dataStoreWaste')

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  // Filtramos los residuos por mes y año actual
  const groupedList = filterByMonthYear(groupedItems, month, year)

  return (
    <View>
      <div className='SummaryDiv'>

        <h2 className='title'>Datos resumidos de Residuos:</h2>
        
        {groupedList.map(item => (
          <GroupedWasteItem key={item.id} item={item} />
        ))}
      
      </div>
    </View>
  );
};

export default SummaryWaste