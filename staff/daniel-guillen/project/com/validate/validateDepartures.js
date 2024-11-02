import { ContentError } from "../errors.js"

const REFERENCE_REGEX = /^[a-zA-Z0-9]+(?:[ -][a-zA-Z0-9]+)*$/
const CONTAINER_OPTIONS = ['PALET', 'GRG', 'BIGBAG', 'B200', 'B-200']

export function validateCode(code) {
  if (!code || typeof code !== 'string') {
      throw new ContentError('El campo "code" es requerido y debe ser una cadena.')
  }
}

export function validateContainer(container) {
  if (!CONTAINER_OPTIONS.includes(container)) {
      throw new ContentError(`El campo "container" debe ser uno de los siguientes valores: ${CONTAINER_OPTIONS.join(', ')}.`)
  }
}

export function validateDescription(description) {
  if (!description || typeof description !== 'string') {
      throw new ContentError('El campo "description" es requerido y debe ser una cadena.')
  }
}

export function validateReference(reference) {
  if (typeof reference !== 'string' || !REFERENCE_REGEX.test(reference)) {
    throw new ContentError('La referencia solo puede contener letras, números y el símbolo "-".')
  }
}

export function validateWeight(weight) {
  if (!/^\d{1,4}$/.test(weight) || Number(weight) < 5 || Number(weight) > 1500) {
      throw new ContentError('El campo "weight" debe ser un número entre 5 y 1500.')
  }
}

export function validateWeek(week) {
  if (!week || !/^(0[1-9]|[1-4][0-9]|5[0-3])$/.test(week)) {
      throw new(new ContentError('El campo "week" es requerido con un valor entre "01" y "53".'))
  }
}

export function validateYear(year) {
  if (!year || !/^\d{4}$/.test(year) || Number(year) < 2024 || Number(year) > 2099) {
      throw new ContentError('El campo "year" debe ser un valor entre "2024" y "2099".')
  }
}

const validate = {
  code: validateCode,
  container: validateContainer,
  description: validateDescription,
  reference: validateReference,
  weight: validateWeight,
  week: validateWeek,
  year: validateYear
}

export default validate