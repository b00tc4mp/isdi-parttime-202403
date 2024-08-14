import React from 'react'
import useFetchWasteList from '../../../firebase/stored/useFetchWasteList'
import useDeleteWaste from '../../../firebase/stored/useDeleteWaste'
import useWasteSelection from '../../../handlers/useWasteSelection'
import WasteItem from '../../../components/WasteItem'
import WasteSelect from '../../../components/WasteSelect'
import MenuStore from '../MenuStore'
import View from '../../../components/core/View'
import './index.css'

const SearchWaste = () => {

    const { selectedWaste, handleWasteChange } = useWasteSelection()  
    const { list, setList } = useFetchWasteList()
    const { deleteWaste } = useDeleteWaste(list, setList)

    // Filtramos los residuos por selectedWaste.code
    const filteredList = list.filter(item => item.code === selectedWaste.code)

  return (
    <View>
    <div className='SearchWasteDiv'>
      
      <WasteSelect selectedWaste={selectedWaste} handleWasteChange={handleWasteChange} />
      
        <h2 className='DataWasteTitle' >
        Resultados...
        </h2>
          {filteredList
              .sort((a, b) => {

                // ordenamos list primero por code
                const codeComparison = a.code.localeCompare(b.code)
                if (codeComparison !== 0) return codeComparison
                
                // despues por acondicionamiento
                const containerComparison = b.container.localeCompare(a.container)
                if (containerComparison !== 0) return containerComparison
                
                // y por ultimo por peso
                return b.weight - a.weight
              })
              .map((item) => (
                <WasteItem key={item.id} item={item} onDelete={deleteWaste} />
              ))}
        <MenuStore />
    </div>
    </View>
  )
}

export default SearchWaste