import React from 'react'
import View from '../../../../components/core/View'
import WasteItem from '../../../../components/WasteItem'
import useFetchTruck3List from '../../../../firebase/truck3/useFetchTruck3List'
import useDeleteTruck3 from '../../../../firebase/truck3/useDeleteTruck3'
import sortWasteItems from '../../../../logic/sortWasteItems'

const DataTruckLoad3 = () => {

  const { list, setList } = useFetchTruck3List()
  const { deleteWaste } = useDeleteTruck3(list, setList)
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
  );
};

export default DataTruckLoad3
