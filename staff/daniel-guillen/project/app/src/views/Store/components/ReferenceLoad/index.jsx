import { useState, useEffect } from 'react'
import './index.css'

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
    <div className='DeparturesTitle'>
      <h3 className='title'>Registrar carga para</h3>

      <input
        className='input-reference'
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='introduce referencia'
        style={{
          width: inputValue.length > 0 ? `${inputValue.length + 1}ch` : '18ch'
        }}
      />

      {inputValue !== reference && ( // mostramos el boton de guardar solo si el valor ha cambiado
        <button className='button-reference' onClick={handleSave}>💾</button>
      )}

      {reference && ( // mostramos boton de eliminar solo si hay un valor almacenado
        <button className='button-reference' onClick={handleDelete}>🗑️</button>
      )}
    </div>
  )
}

export default ReferenceLoad