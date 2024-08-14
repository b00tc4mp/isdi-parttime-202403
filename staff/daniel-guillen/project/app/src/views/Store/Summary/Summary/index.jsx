import React from 'react'
import useGroupedWasteList from '../../../../logic/groupedItemCode'
import View from '../../../../components/core/View'
import GroupedWasteItem from '../../../../components/GroupedWasteItem'
import '../index.css'

const SummaryWaste = () => {

  const groupedItemCode = useGroupedWasteList()

  return (
    <View>
      <div className='SummaryDiv'>
        <h2>Datos resumidos de Residuos:</h2>
        {groupedItemCode.map(item => (
          <GroupedWasteItem key={item.id} item={item} />
        ))}
      </div>
    </View>
  );
};

export default SummaryWaste