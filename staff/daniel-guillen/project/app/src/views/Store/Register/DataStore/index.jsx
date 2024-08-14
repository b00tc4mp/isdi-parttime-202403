import React from 'react'
import './index.css'

import View from '../../../../components/core/View'
import WasteItem from '../../../../components/WasteItem'
import useFetchWasteList from '../../../../firebase/stored/useFetchWasteList'
import useDeleteWaste from '../../../../firebase/stored/useDeleteWaste'
import sortWasteItems from '../../../../logic/sortWasteItems'

const DataStoreList = () => {
  
  const { list, setList } = useFetchWasteList()
  const { deleteWaste } = useDeleteWaste(list, setList)

  const today = new Date()
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  // Filtramos los residuos por mes y año actual
  const filteredList = list.filter(item => item.month === month && item.year === year)

  // Ordenamos la lista filtrada
  const sortedList = sortWasteItems(filteredList)

  return (
    <View>
      <div className='DataStoreWasteDiv'>
        <h2 className='DataStoreTitle'>Lista de Residuos almacenados:</h2>
        {sortedList.map((item) => (
          <WasteItem key={item.id} item={item} onDelete={deleteWaste} />
        ))}
      </div>
    </View>
  )
}

export default DataStoreList
