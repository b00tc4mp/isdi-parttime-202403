import React, { useState, useEffect } from 'react'
import View from '../../../../components/core/View'
import WasteItem from '../../../../components/WasteItem'
import useFetchTruck3List from '../../../../firebase/truck3/useFetchTruck3List'
import useDeleteTruck3 from '../../../../firebase/truck3/useDeleteTruck3'
import sortWasteItems from '../../../../logic/sortWasteItems'
import getWeekNumber from '../../../../logic/getWeekNumber'

const DataTruckLoad3 = () => {

  const { list, setList } = useFetchTruck3List()
  const { deleteWaste } = useDeleteTruck3(list, setList)
  const [week, setWeek] = useState("")
  const [year, setYear] = useState("")

  useEffect(() => {
    const today = new Date()
    setWeek(getWeekNumber(today))
    setYear(today.getFullYear().toString())
  }, [])

    // Filtramos los residuos por semana y año actual
    const filteredList = list.filter(item => item.week === week && item.year === year)

    // Ordenamos la lista filtrada
    const sortedList = sortWasteItems(filteredList)

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

export default DataTruckLoad3
