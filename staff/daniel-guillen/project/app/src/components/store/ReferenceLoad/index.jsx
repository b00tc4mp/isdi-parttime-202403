import { useState, useEffect } from 'react'
import './index.css'
// components
import Button from '../../core/Button'
import Text from '../../core/Text'

const ReferenceLoad = ({ reference, onReferenceChange }) => {
  const [inputValue, setInputValue] = useState('')

  // cargar valor de sessionStorage si existe
  useEffect(() => {
    if (reference) {
      setInputValue(reference)
    }
  }, [reference])

  // manejar cambios en el input
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  // guardar valor en sessionStorage
  const handleSave = () => {
    if (inputValue) {
      sessionStorage.setItem('reference', inputValue)
      onReferenceChange(inputValue) // pasamos prop hacia el componente padre
      alert('✍️ Referencia guardada en sessionStorage 💾')
    }
  }

  // eliminar valor del sessionStorage con alert
  const handleDelete = () => {
    const confirmDelete = window.confirm('🗑️ ¿Estás seguro de que deseas eliminar la referencia guardada? 💾')
    if (confirmDelete) {
      sessionStorage.removeItem('reference')
      onReferenceChange('') // pasamos prop hacia el componente padre
      setInputValue('')
      alert('🗑️ Referencia eliminada de sessionStorage 🎉')
    }
  }

  return (
    <div className='ReferenceDiv'>
      <div className='InputDiv'>
      <Text className='ReferenceLabel'>Registrar carga para</Text>

      <input
        className='InputReference'
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='introduce referencia'
      />
      </div >

      <div className='ButtonReferenceDiv'>
      {inputValue !== reference && ( // mostramos el boton de guardar solo si el valor ha cambiado
        <Button className='ButtonReference' onClick={handleSave}>💾</Button>
      )}

      {reference && ( // mostramos boton de eliminar solo si hay un valor almacenado
        <Button className='ButtonReference' onClick={handleDelete}>🗑️</Button>
      )}
      </div>
    </div>
  )
}

export default ReferenceLoad