import React from 'react'
//components
import WasteItem from '../../../../components/WasteItem'
//hooks
import useFetchItemsList from '../../../../hooks/useFetchItemsList'
import useDeleteItem from '../../../../hooks/useDeleteItem'
//utils
import getWeekNumberYear from '../../../../utils/getWeekNumberYear'
import sortWasteItems from '../../../../utils/sortWasteItems'

const DataTruckLoad1 = ({ refreshList, refreshData }) => {

  const { data: list } = useFetchItemsList('dataTruck1Load', refreshList)  // usamos el hook para obtener los datos
  const { deleteWaste  } = useDeleteItem('dataTruck1Load', refreshData)  // pasamos refreshData
  const { week, year } = getWeekNumberYear()

    // Filtramos los residuos por semana y año actual
    const filteredList = list.filter(item => item.week === week && item.year === year)

    // Ordenamos la lista filtrada
    const sortedList = sortWasteItems(filteredList)

  return (

      <div className='TruckLoadListDiv'>
        <h2 className='title'>Lista de Residuos:</h2>

      {sortedList.length > 0 ? (
        sortedList.map(item => (
          <WasteItem key={item.id} item={item} onDelete={deleteWaste} />
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>

  )
}

export default DataTruckLoad1