import React from 'react'
//components
import View from '../../../components/core/View'
import WasteItem from '../../../components/WasteItem'
//logic
import useFetchItemsList from '../../../logic/useFetchItemsList'
import useDeleteItem from '../../../logic/useDeleteItem'
import filterByMonthYear from '../../../logic/filterByMonthYear'
import sortWasteItems from '../../../logic/sortWasteItems'

const DataStoreList = () => {

  //traemos los residuos
  const { list } = useFetchItemsList('dataStoreWaste')
  const { deleteWaste  } = useDeleteItem('dataStoreWaste')
  
  const today = new Date();
  const date = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())

  // Filtramos los residuos por mes y año
  const filteredList = filterByMonthYear(list, date, year)

  // Ordenamos la lista de residuos por codigo, por acondicionamiento y por ultimo por peso
  const sortedList = sortWasteItems(filteredList)

  return (
    <View>
        <h2 className='title'>Residuos almacenados {date}/{year}</h2>

        {sortedList.map((item) => (
          //renderizamos la lista de residuos con estilos especificos
          <WasteItem key={item.id} item={item} onDelete={deleteWaste} />
        ))}
    </View>
  )
}

export default DataStoreList
