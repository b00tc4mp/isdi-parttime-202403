import { ContentError } from "../errors.js"

const CONTAINER_OPTIONS = ['PALET', 'GRG', 'BIGBAG', 'B200', 'B-200']
const STATUS_OPTIONS = ['CORRECTO', 'ESTANCADO']

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

export function validateStatus(status) {
    if (!STATUS_OPTIONS.includes(status)) {
        throw new ContentError(`El campo "status" debe ser uno de los siguientes valores: ${STATUS_OPTIONS.join(', ')}.`)
    }
}

export function validateWeight(weight) {
    if (!/^\d{1,4}$/.test(weight) || Number(weight) < 5 || Number(weight) > 1500) {
        throw new ContentError('El campo "weight" debe ser un número entre 5 y 1500.')
    }
}

export function validateMonth(month) {
    if (!month || !/^(0[1-9]|1[0-2])$/.test(month)) {
        throw new ContentError('El campo "month" es requerido y debe ser un valor entre "01" y "12".')
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
    status: validateStatus,
    weight: validateWeight,
    month: validateMonth,
    year: validateYear
}

export default validate