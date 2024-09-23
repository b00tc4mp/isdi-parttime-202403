const validateWasteData = (selectedWaste, weight, optionsContainer, statusOptions) => {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())
  
    if (!selectedWaste.code || typeof selectedWaste.code !== 'string') {
      throw new Error('El campo "code" es requerido y debe ser una cadena.')
    }
    if (!['PALET', 'GRG', 'BIGBAG', 'B200', 'B-200'].includes(optionsContainer)) {
      throw new Error('El campo "container" debe ser uno de los siguientes valores: PALET, GRG, BIGBAG, B200, B-200.')
    }
    if (!selectedWaste.description || typeof selectedWaste.description !== 'string') {
      throw new Error('El campo "description" es requerido y debe ser una cadena.')
    }
    if (!statusOptions || !['CORRECTO', 'ESTANCADO'].includes(statusOptions)) {
      throw new Error('El campo "status" debe ser "CORRECTO" o "ESTANCADO".')
    }
    if (!/^\d{1,4}$/.test(weight) || Number(weight) < 5 || Number(weight) > 1500) {
      throw new Error('El campo "weight" es requerido y debe ser un número entre 5 y 1500.')
    }
    if (!month || !/^(0[1-9]|1[0-2])$/.test(month)) {
      throw new Error('El campo "month" es requerido y debe ser una cadena con un valor entre "01" y "12".')
    }
    if (!year || year < '2024' || year > '2099') {
      throw new Error('El campo "year" es requerido y debe ser una cadena de 4 dígitos (Ejemplo: "2024").')
    }
  
    return { month, year }
  }

  export default validateWasteData 