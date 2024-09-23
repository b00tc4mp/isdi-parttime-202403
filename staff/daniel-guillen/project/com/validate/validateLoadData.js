const validateLoadData = (selectedWaste, optionsContainer, weight, week, year, reference) => {
    if (!selectedWaste.code || typeof selectedWaste.code !== 'string') {
      throw new Error('Código es requerido.')
    }
    if (!['PALET', 'GRG', 'BIGBAG', 'B200', 'B-200'].includes(optionsContainer)) {
      throw new Error('Elija uno de los siguientes valores: PALET, GRG, BIGBAG, B200, B-200.')
    }
    if (!selectedWaste.description || typeof selectedWaste.description !== 'string') {
      throw new Error('Descripción es requerida.')
    }
    if (!reference || typeof reference !== 'string') {
      throw new Error('Referencia es requerida y debe tener al menos 4 caracteres.')
    }
    if (!/^\d{1,4}$/.test(weight) || Number(weight) < 5 || Number(weight) > 1500) {
      throw new Error('Peso debe ser un número entre 5 y 1500.')
    }
    if (!week || typeof week !== 'string' || !/^(0[1-9]|[1-4][0-9]|5[0-3])$/.test(week)) {
      throw new Error('Semana es requerida y debe ser un número entre "01" y "53".')
    }
    if (!year || year < '2024' || year > '2099') {
      throw new Error('Año es requerido y debe ser un número de 4 dígitos (Ejemplo: "2024").')
    }
  }
  
  export default validateLoadData  