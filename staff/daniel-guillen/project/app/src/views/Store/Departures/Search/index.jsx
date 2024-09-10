// Search.js
import MenuLoads from '../../components/MenuLoads'
import ReferenceSelect from '../../components/ReferenceSelect'
import { useState } from 'react'
import '../index.css'
import SearchLoad from './SearchLoad'
import SearchSummary from './SearchSummary'

const Search = () => {
  const [selectedReference, setSelectedReference] = useState("")

  const handleReferenceChange = (selectedReference) => {
    setSelectedReference(selectedReference)
    console.log("Referencia seleccionada:", selectedReference)
  }

  return (
    <div className='container'>
      <h1 className='RouteTitle'>BUSCAR SALIDA POR</h1>
      <ReferenceSelect
        selectedReference={selectedReference}
        handleReferenceChange={handleReferenceChange}
      />
      <SearchSummary selectedReference={selectedReference} />
      <SearchLoad selectedReference={selectedReference} />
      <MenuLoads />
    </div>
  )
}

export default Search
