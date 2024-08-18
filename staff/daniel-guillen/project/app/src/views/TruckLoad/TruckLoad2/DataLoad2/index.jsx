import React from 'react'
//components
import View from '../../../../components/core/View'
import WasteItem from '../../../../components/WasteItem'
//logic
import useFetchItemsList from '../../../../logic/useFetchItemsList'
import useDeleteItem from '../../../../logic/useDeleteItem'
import getWeekNumberYear from '../../../../logic/getWeekNumberYear'
import sortWasteItems from '../../../../logic/sortWasteItems'

const DataTruckLoad2 = () => {

  const { list } = useFetchItemsList('dataTruck2Load')
  const { deleteWaste  } = useDeleteItem('dataTruck2Load')
  const { week, year } = getWeekNumberYear()

    // Filtramos los residuos por semana y año actual
    const filteredList = list.filter(item => item.week === week && item.year === year)

    // Ordenamos la lista filtrada
    const sortedList = sortWasteItems(filteredList)

  return (
    <View>
      <div className='TruckLoadListDiv'>
        <h2 className='title'>Lista de Residuos:</h2>
        {sortedList.map((item) => (
          <WasteItem key={item.id} item={item} onDelete={deleteWaste} />
        ))}
      </div>
    </View>
  )
}

export default DataTruckLoad2