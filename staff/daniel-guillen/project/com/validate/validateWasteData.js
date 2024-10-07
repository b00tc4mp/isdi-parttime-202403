const validateWasteData = (wasteData) => {
  const { code, container, description, status, weight, month, year } = wasteData
  const errors = []

  if (!code || typeof code !== 'string') {
      errors.push('El campo "code" es requerido y debe ser una cadena.')
  }

  if (!['PALET', 'GRG', 'BIGBAG', 'B200', 'B-200'].includes(container)) {
      errors.push('El campo "container" debe ser uno de los siguientes valores: PALET, GRG, BIGBAG, B200, B-200.')
  }

  if (!description || typeof description !== 'string') {
      errors.push('El campo "description" es requerido y debe ser una cadena.')
  }

  if (!status || !['CORRECTO', 'ESTANCADO'].includes(status)) {
      errors.push('El campo "status" debe ser "CORRECTO" o "ESTANCADO".')
  }

  if (!/^\d{1,4}$/.test(weight) || Number(weight) < 5 || Number(weight) > 1500) {
      errors.push('El campo "weight" es requerido y debe ser un número entre 5 y 1500.')
  }

  if (!month || !/^(0[1-9]|1[0-2])$/.test(month)) {
      errors.push('El campo "month" es requerido y debe ser una cadena con un valor entre "01" y "12".')
  }

  if (!year || !/^\d{4}$/.test(year) || year < '2024' || year > '2099') {
      errors.push('El campo "year" es requerido y debe ser una cadena de 4 dígitos (Ejemplo: "2024").')
  }

  if (errors.length > 0) { // si hay errores campos no validos, de lo contrario retorna los datos como validados.
      return { isValid: false, errors }
  }

  return { isValid: true, wasteData: { code, container, description, status, weight, month, year } }
}

export default validateWasteData