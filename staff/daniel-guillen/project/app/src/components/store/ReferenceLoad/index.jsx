import './index.css'
import { Button, Text } from '../../core'
import { useState, useEffect, useCustomContext  } from '../../../utils/hooks'
import validate from 'com/validate/validateDepartures'

const ReferenceLoad = ({ reference, onReferenceChange }) => {
  const [inputValue, setInputValue] = useState('')
  const { alert, confirm } = useCustomContext()


  useEffect(() => {
    if (reference) {
      setInputValue(reference)
    }
  }, [reference])


  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSave = () => {
    try {
      validate.reference(inputValue)
      sessionStorage.setItem('reference', inputValue)
      onReferenceChange(inputValue)
      alert('✍️ Referencia guardada en sessionStorage 💾')
    } catch (validationError) {
      alert(validationError.message) 
    }
  }

  const handleDelete = () => {
    confirm({
      message: '🗑️ ¿Estás seguro de que deseas eliminar la referencia? 📦',
      onAccept: () => {sessionStorage.removeItem('reference')
        onReferenceChange('')
        setInputValue('')
        alert('🗑️ Referencia eliminada de sessionStorage 🎉')
      },
      onCancel: () => {
        alert('🗑️ Eliminación cancelada ❌')
      },
    })
  }

  return (
    <div className='ReferenceDiv'>
      <div className='InputDiv'>

      <Text className='ReferenceLabel'>🚚📦</Text>
      <input className='InputReference' type='text' value={inputValue}
      onChange={handleInputChange} placeholder='introduce referencia' />

      </div >

      <div className='ButtonReferenceDiv'>
        
      {inputValue !== reference && ( <Button className='ButtonReference' onClick={handleSave}>💾</Button> )}

      {reference && ( <Button className='ButtonReference' onClick={handleDelete}>🗑️</Button> )}
      
      </div>
    </div>
  )
}

export default ReferenceLoad