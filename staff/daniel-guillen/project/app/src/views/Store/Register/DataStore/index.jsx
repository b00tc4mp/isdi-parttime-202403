import React from 'react'
import './index.css'

import View from '../../../../components/core/View'
import WasteItem from '../../../../components/WasteItem'
import useFetchWasteList from '../../../../firebase/stored/useFetchWasteList'
import useDeleteWaste from '../../../../firebase/stored/useDeleteWaste'

const DataStoreList = () => {
  
  const { list, setList } = useFetchWasteList()
  const { deleteWaste } = useDeleteWaste(list, setList)

  return (
    <View>
      <div className='DataStoreWasteDiv'>
        <h2 className='DataStoreTitle'>Lista de Residuos almacenados:</h2>
        {list
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
      </div>
    </View>
  )
}

export default DataStoreList
