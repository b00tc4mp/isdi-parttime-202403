
const useSubmitWaste = (selectedWaste, weight, optionsContainer, statusOptions, refreshData) => {
  const saveData = async () => {
    try {
      const today = new Date()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const year = String(today.getFullYear())

      if (!selectedWaste.code || typeof selectedWaste.code !== 'string') {
        throw new Error('El campo "code" es requerido y debe ser una cadena.')
      }
      if (!optionsContainer.container || typeof optionsContainer.container !== 'string') {
        throw new Error('El campo "container" es requerido y debe ser una cadena.')
      }
      if (!['PALET', 'GRG', 'BIGBAG', 'B200', 'B-200'].includes(optionsContainer.container)) {
        throw new Error('El campo "container" debe ser uno de los siguientes valores: PALET, GRG, BIGBAG, B200, B-200.')
      }      
      if (!selectedWaste || typeof selectedWaste !== 'string') {
        throw new Error('El campo "description" es requerido y debe ser una cadena.')
      }
      if (!statusOptions || typeof statusOptions !== 'string') {
        console.log('Error: El campo "status" es requerido.')
        throw new Error(400).json({ message: 'El campo "status" es requerido y debe ser una cadena.' })
      }
      
      if (statusOptions !== 'CORRECTO' && statusOptions !== 'ESTANCADO') {
        console.log('Error: El campo "status" debe ser "CORRECTO" o "ESTANCADO".')
        throw new Error(400).json({ message: 'El campo "status" debe ser "CORRECTO" o "ESTANCADO".' })
      }
      
      if (weight == null || typeof weight !== 'number' || weight < 5 || weight > 1500) {
        throw new Error('El campo "weight" es requerido y debe ser un número entre 5 y 1500.')
      }
      if (!month || typeof month !== 'string' || !/^(0[1-9]|1[0-2])$/.test(month)) {
        throw new Error('El campo "month" es requerido y debe ser una cadena con un valor entre "01" y "12".')
      }
      if (year == null || typeof year !== 'string' || year < '2024' || year > '2099') {
        throw new Error('El campo "year" es requerido y debe ser un número entre 2024 y 2099.')
      }

      const dataWaste = {
        code: selectedWaste.code,
        description: selectedWaste.description,
        weight: weight,
        container: optionsContainer.container,
        status: statusOptions,
        month: month,
        year: year,
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}stored/createWaste`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWaste),
      })

      const result = await response.json()

      if (response.ok) {
        alert('Residuo Registrado 🎉 ' + selectedWaste + '-' + selectedWaste)
        refreshData() // Refresca la lista de datos
      } else {
        throw new Error(result.message || 'Error al registrar el residuo')
      }
    } catch (error) {
      console.error('Error registrando el residuo:', error.message)
      alert('Error: ' + error.message) // Muestra un mensaje de error al usuario
    }
  }

  return { saveData }
}

export default useSubmitWaste
