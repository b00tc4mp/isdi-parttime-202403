import React, { useEffect, useState } from 'react'
import View from '../../components/core/View'
import WasteItem from "../../components/WasteItem"
import useFetchWasteList from '../../firebase/stored/useFetchWasteList'
import useDeleteWaste from '../../firebase/stored/useDeleteWaste'
import sortWasteItems from '../../logic/sortWasteItems'

const Fleet = () => {
    
    const { list, setList } = useFetchWasteList()
    const { deleteWaste } = useDeleteWaste(list, setList)

    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())
  
    // Filtramos los residuos por mes actual
    const filteredList = list.filter(item => item.month === month)

    // Ordenamos la lista filtrada
    const sortedList = sortWasteItems(filteredList)

  return (
    <View>
    <div className='SearchWasteDiv'>      
        <h2 className='DataWasteTitle'>Resultados...</h2>
      
        {sortedList.map((item) => (
          <WasteItem key={item.id} item={item} onDelete={deleteWaste} />
        ))}
    </div>
    </View>
  )
}

export default Fleet