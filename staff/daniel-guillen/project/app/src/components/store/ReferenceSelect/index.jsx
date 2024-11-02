import './index.css'
import Select from 'react-select'
import { useState, useEffect } from 'react'
import fetchReferencesLoad from '../../../logic/departures/getReferencesLoad'

const ReferenceSelect = ({ selectedReference, handleReferenceChange }) => {
  const token = sessionStorage.getItem('token') 
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  
  useEffect(() => {
    const loadReferences = async () => {
      const { options, selectedOption } = await fetchReferencesLoad(selectedReference, token)
      setOptions(options)
      setSelectedOption(selectedOption)
    }
    loadReferences()
  }, [selectedReference, token])

  return (
    <div className='ReferenceLoadDiv'>
      <Select
        className='ReferenceSelected'
        id='ReferenceSelect'
        placeholder="REFERENCIA"
        options={options}
        value={selectedOption}
        onChange={(selected) => handleReferenceChange(selected ? selected.value : null)}
        isClearable
      />
    </div>
  )
}

export default ReferenceSelect