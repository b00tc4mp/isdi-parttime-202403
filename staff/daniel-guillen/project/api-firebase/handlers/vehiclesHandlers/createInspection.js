import { db } from '../../firebase.js'
import validate from 'com/validate/validateVehicles.js'
import { ContentError } from 'com/errors.js'

const createInspection = async (req, res, next) => {
  try {
    const { vehicle, inspection, worker } = req.body

    // Validar los datos de inspeccion
    try {
      validate.vehicle(vehicle)
      validate.inspection(inspection)
      validate.worker(worker)
    } catch (validationError) {
      return next(new ContentError(validationError.message))
    }
    // Crear el objeto de carga
    const newInspection = {
      vehicle: { id: vehicle.id, model: vehicle.model, size: vehicle.size },
      inspection: { itemFix: inspection.itemFix, notes: inspection.inspectionNote },
      worker: { workerName: worker.workerName, month: worker.month, year: worker.year, date: worker.date }
    }

    // Guardar en la base de datos (Firebase)
    const InspectionRef = await db.collection('inspections').add(newInspection)

    console.log(`Inspección registrada: ${vehicle.model} - ${worker.workerName}- ${worker.date}`)
    // Respuesta exitosa
    res.status(201).json({
      message: 'Nueva inspección registrada',
      InspectionRef: InspectionRef.id,
      Vehiculo: vehicle.model,
      Worker: worker.workerName,
    })
  } catch (error) {
    next(error)
  }
}

export default createInspection
