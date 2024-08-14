import React from 'react'
import useFetchWasteList from '../../../firebase/stored/useFetchWasteList'
import useDeleteWaste from '../../../firebase/stored/useDeleteWaste'
import useWasteSelection from '../../../handlers/useWasteSelection'
import WasteItem from '../../../components/WasteItem'
import WasteSelect from '../../../components/WasteSelect'
import MenuStore from '../MenuStore'
import View from '../../../components/core/View'
import './index.css'
import sortWasteItems from '../../../logic/sortWasteItems'

const SearchWaste = () => {

    const { selectedWaste, handleWasteChange } = useWasteSelection()  
    const { list, setList } = useFetchWasteList()
    const { deleteWaste } = useDeleteWaste(list, setList)
  
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())

    // Filtramos por selectedWaste, por mes y año actual
    const filteredList = list.filter(item => item.code === selectedWaste.code &&item.month === month && item.year === year)

    // Ordenamos la lista filtrada
    const sortedList = sortWasteItems(filteredList)

  return (
    <View>
    <div className='SearchWasteDiv'>
      
      <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
      
        <h2 className='DataWasteTitle'>Resultados...</h2>
      
        {sortedList.map((item) => (
          <WasteItem key={item.id} item={item} onDelete={deleteWaste} />
        ))}
        <MenuStore />
    </div>
    </View>
  )
}

export default SearchWaste