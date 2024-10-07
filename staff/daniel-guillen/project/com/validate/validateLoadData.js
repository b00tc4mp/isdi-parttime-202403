const validateLoadData = (loadData) => {
  const { code, container, description, reference, weight, week, year } = loadData
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

  if (!reference || typeof reference !== 'string') {
    errors.push('El campo "reference" es requerido y debe ser una cadena.')
  }

  if (!/^\d{1,4}$/.test(weight) || Number(weight) < 5 || Number(weight) > 1500) {
    errors.push('El campo "weight" es requerido y debe ser un número entre 5 y 1500.')
  }

  if (!week || !/^(0[1-9]|[1-4][0-9]|5[0-3])$/.test(week)) {
    errors.push('El campo "week" es requerido con un valor entre "01" y "53".')
  }

  if (!year || !/^\d{4}$/.test(year) || year < '2024' || year > '2099') {
    errors.push('El campo "year" es requerido y debe ser un valor de 4 dígitos (Ejemplo: "2024").')
  }

  if (errors.length > 0) {
    return { isValid: false, errors } // Si hay errores, devolverlos de lo contrario, devolver los datos validados
  }

  return { isValid: true, loadData: { code, container, description, reference, weight, week, year } }
}

export default validateLoadData 