import { db } from '../../firebase.js'
import validateInspectionData from 'com/validate/validateInspectionData.js'

const createInspection = async (req, res) => {
  try {
    const { vehicle, inspection, worker } = req.body

    // Preparar los datos para la validación
    const inspectionData = {
      workerName: worker.workerName,
      selectedVehicle: vehicle,
      checkList: inspection.itemFix,
      inspectionNote: inspection.notes,
      month: worker.month,
      year: worker.year
    }

    const { isValid, errors } = validateInspectionData(inspectionData) // Validar los datos recibidos

    if (!isValid) {
      console.log('Errores de validación:', errors)
      return res.status(400).json({ message: errors.join(', ') })
    }

    const newInspection = {  // Estructura de datos para guardar
      vehicle: { id: vehicle.id, model: vehicle.model, size: vehicle.size },
      inspection: { itemFix: inspection.itemFix, notes: inspection.notes },
      worker: { workerName: worker.workerName, month: worker.month, year: worker.year }
    }

    const InspectionRef = await db.collection('inspections').add(newInspection) // Guardar la inspección en Firestore

    console.log(`Inspección registrada: ${vehicle.model} - ${worker.workerName}`)

    res.status(201).json({ // Respuesta exitosa
      message: 'Nueva inspección registrada',
      InspectionRef: InspectionRef.id,
      Vehiculo: vehicle.model,
      Worker: worker.workerName,
    })
  } catch (error) {
    console.error('Error al registrar inspección', error)
    res.status(500).json({ message: 'Error al registrar inspección' })
  }
}

export default createInspection
