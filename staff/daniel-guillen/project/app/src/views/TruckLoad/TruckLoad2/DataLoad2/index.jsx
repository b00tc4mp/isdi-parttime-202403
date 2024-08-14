import React from 'react'
import View from '../../../../components/core/View'
import WasteItem from '../../../../components/WasteItem'
import useFetchTruck2List from '../../../../firebase/truck2/useFetchTruck2List'
import useDeleteTruck2 from '../../../../firebase/truck2/useDeleteTruck2'
import sortWasteItems from '../../../../logic/sortWasteItems'

const DataTruckLoad2 = () => {

  const { list, setList } = useFetchTruck2List()
  const { deleteWaste } = useDeleteTruck2(list, setList)
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

export default DataTruckLoad2
