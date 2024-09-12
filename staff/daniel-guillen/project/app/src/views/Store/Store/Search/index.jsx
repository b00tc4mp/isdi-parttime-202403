import MenuStore from '../../components/MenuStore'
import CodeSelect from '../../components/CodeSelect'
import { useState } from 'react'
import SearchCode from './SearchCode'

const Search = () => {
  const [selectedWaste, setSelectedWaste] = useState("")

  const handleCodeChange = (selectedWaste) => {
    setSelectedWaste(selectedWaste)
    console.log("Residuo seleccionado:", selectedWaste)
  }

  return (
    <div className='container'>
      <h1 className='RouteTitle'>BUSCAR RESIDUO POR</h1>
      <CodeSelect
        selectedWaste={selectedWaste}
        handleCodeChange={handleCodeChange}
      />
      <SearchCode selectedWaste={selectedWaste} />
      <MenuStore />
    </div>
  )
}

export default Search