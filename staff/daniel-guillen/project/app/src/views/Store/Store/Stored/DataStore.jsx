import React from 'react'
//components
import WasteItem from '../../components/WasteItem'
//hooks
import useDeleteItem from '../../../../hooks/useDeleteItem'
import useFetchItemsList from '../../../../hooks/useFetchItemsList'
//utils
import filterByMonthYear from '../../../../utils/filterByMonthYear'
import sortWasteItems from '../../../../utils/sortWasteItems'

const DataStoreList = ({ refreshList, refreshData }) => {  // añadimos refreshData
  
  const { data: list } = useFetchItemsList('dataStoreWaste', refreshList)  // usamos el hook para obtener los datos
  const { deleteWaste } = useDeleteItem('dataStoreWaste', refreshData)  // pasamos refreshData
  
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  const filteredList = filterByMonthYear(list, month, year)
  const sortedList = sortWasteItems(filteredList)

  return (
    <div>
      <h2 className='title'>Residuos almacenados {month}/{year}</h2>
      
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

export default DataStoreList