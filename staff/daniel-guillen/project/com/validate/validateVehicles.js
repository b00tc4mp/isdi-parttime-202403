import { ContentError } from "../errors.js"

export function validateVehicle(vehicle) {
  if (!vehicle || typeof vehicle !== 'object') {
    throw new ContentError('Rellenar los campos de vehiculo es necesario.')
  } else {
    const { id, model, size } = vehicle
    if (!id || typeof id !== 'string') {
      throw new ContentError('El ID del vehículo es requerido.')
    }
    if (!model || typeof model !== 'string') {
      throw new ContentError('El modelo del vehículo es requerido.')
    }
    if (!['small', 'medium', 'big'].includes(size)) {
      throw new ContentError('El tamaño del vehículo debe ser "small", "medium" o "big".')
    }
  }
}

export function validateInspection(inpection) {
    if (!inpection || typeof inpection !== 'object') {
      throw new ContentError('Rellenar los campos de inspección es necesario.')
    } else {
      const { itemFix, inspectionNote } = inpection
      if (!Array.isArray(itemFix) || itemFix.length === 0) {
        throw new ContentError('La lista de verificación es requerida y debe contener al menos un elemento.')
      }
      if (!inspectionNote || typeof inspectionNote !== 'string') {
        throw new ContentError('Las notas de la inspección son requeridas.')
      }
  }
}

export function validateWorker(worker) {
  if (!worker || typeof worker !== 'object') {
    throw new ContentError('Rellenar los campos de inspección es necesario.')
  } else {
      const { workerName, month, year, date } = worker
    if (!workerName || typeof workerName !== 'string') {
      throw new ContentError('El nombre del trabajador es requerido y debe ser una cadena.')
    }
    if (!month || !/^(0[1-9]|1[0-2])$/.test(month)) {
      throw new ContentError('El campo "month" es requerido y debe ser un valor entre "01" y "12".')
    }
    if (!year || !/^\d{4}$/.test(year) || Number(year) < 2024 || Number(year) > 2099) {
      throw new ContentError('El campo "year" debe ser un valor entre "2024" y "2099".')
    }
    if (!date || typeof date !== 'string') {
      throw new ContentError('El campo "date" es requerido y debe ser una cadena.')
    }
  }
}
const validate = {
   vehicle : validateVehicle,
   inspection: validateInspection,
   worker: validateWorker
}

export default validate