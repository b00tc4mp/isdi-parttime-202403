import './index.css'
import Select from 'react-select'
import { useState, useEffect } from 'react'
import fetchCodesWasteStored from '../../../logic/stored/getCodesWasteStored'

const CodeSelect = ({ selectedWaste, handleCodeChange, month, year, token }) => {
  
  const [data, setData] = useState([])
  const options = data.sort((a, b) => a.value.localeCompare(b.value))
  const selectedOption = options.find(option => option.value === selectedWaste)

  useEffect(() => {
    const loadCodes = async () => {
      const fetchedData = await fetchCodesWasteStored(month, year, token)
      const formattedData = fetchedData.map(item => ({
        value: item.code,
        label: `${item.code} - ${item.description}`
      }))
      setData(formattedData)
    }
    loadCodes()
  }, [month, year, token])



  return (
    <div className='CodeSelectedDiv'>
      <Select required
        className='CodeSelected'
        id='CodeSelect'
        placeholder="CODIGO DE RESIDUO"
        options={options}
        value={selectedOption}
        onChange={(selected) => handleCodeChange(selected ? selected.value : null)}
        isClearable
      />
    </div>
  )
}

export default CodeSelect