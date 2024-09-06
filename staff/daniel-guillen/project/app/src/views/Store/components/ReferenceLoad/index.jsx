import { useState, useEffect } from 'react'
import './index.css'

const ReferenceLoad = ({ reference, handleReferenceChange }) => {

  // Estado para el valor del input de referencia
  const [inputValue, setInputValue] = useState('')
  const [storedReference, setStoredReference] = useState('')

  // Cargar valor de sessionStorage si existe
  useEffect(() => {
    const storedRef = sessionStorage.getItem('reference')
    if (storedRef) {
      setInputValue(storedRef)
      setStoredReference(storedRef)
    }
  }, [])

  // Manejar cambios en el input
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  // Guardar valor en sessionStorage
  const handleSave = () => {
    if (inputValue) {
      sessionStorage.setItem('reference', inputValue)
      setStoredReference(inputValue)
      alert('Referencia guardada en sessionStorage')
    }
  }

  // Eliminar valor del sessionStorage con confirmación
  const handleDelete = () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar la referencia guardada?')
    if (confirmDelete) {
      sessionStorage.removeItem('reference')
      setInputValue('')
      setStoredReference('')
      alert('Referencia eliminada de sessionStorage')
    }
  }

  return (
    <div className='ReferenceLoadDiv'>
      
      <input className='input-reference'
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          placeholder='introduce referencia'
          style={{
            width: inputValue.length > 0 ? `${inputValue.length + 1}ch` : '18ch'
          }}
        />
      

      {inputValue !== storedReference && ( // mostramos el boton de guardar solo si el valor no esta
        
          <button className='button-reference' onClick={handleSave}>💾</button>
        
      )}

      {storedReference && ( // mostramos boton de eliminar solo si hay un valor almacenado
        
          <button className='button-reference' onClick={handleDelete}>🗑️</button>
        
      )}
    </div>
  )
}

export default ReferenceLoad
