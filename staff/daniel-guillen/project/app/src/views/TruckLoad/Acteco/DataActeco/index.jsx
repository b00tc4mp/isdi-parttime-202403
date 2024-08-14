import React from 'react'
import View from '../../../../components/core/View'
import WasteItem from '../../../../components/WasteItem'
import useFetchActecoList from '../../../../firebase/acteco/useFetchActecoList'
import useDeleteActeco from '../../../../firebase/acteco/useDeleteActeco'
import sortWasteItems from '../../../../logic/sortWasteItems'

const DataActecoList = () => {

  const { list, setList } = useFetchActecoList()
  const { deleteWaste } = useDeleteActeco(list, setList)
  const sortedList = sortWasteItems(list)

  return (
    <View>
      <div className='TruckLoadListDiv'>
        <h2 className='DataTitle'>Lista de Residuos:</h2>
        {sortedList.map((item) => (
          <WasteItem key={item.id} item={item} onDelete={deleteWaste} />
        ))}
      </div>
    </View>
  )
}

export default DataActecoList
