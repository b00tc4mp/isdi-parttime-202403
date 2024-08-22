import React from 'react'
//components
import WasteItem from '../../../../components/WasteItem'
//hooks
import useFetchItemsList from '../../../../hooks/useFetchItemsList'
import useDeleteItem from '../../../../hooks/useDeleteItem'
//utils
import getWeekNumberYear from '../../../../utils/getWeekNumberYear'
import sortWasteItems from '../../../../utils/sortWasteItems'

const DataTruckLoad1 = () => {

  const { list } = useFetchItemsList('dataTruck1Load')
  const { deleteWaste  } = useDeleteItem('dataTruck1Load')
  const { week, year } = getWeekNumberYear()

    // Filtramos los residuos por semana y año actual
    const filteredList = list.filter(item => item.week === week && item.year === year)

    // Ordenamos la lista filtrada
    const sortedList = sortWasteItems(filteredList)

  return (

      <div className='TruckLoadListDiv'>
        <h2 className='title'>Lista de Residuos:</h2>
        {sortedList.map((item) => (
          <WasteItem key={item.id} item={item} onDelete={deleteWaste} />
        ))}
      </div>

  )
}

export default DataTruckLoad1