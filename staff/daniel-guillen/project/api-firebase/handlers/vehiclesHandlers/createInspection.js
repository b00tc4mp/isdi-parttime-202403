import { db } from '../../firebase.js'

// Handler para crear una inspeccion
const createInspection = async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    const { vehicle, inspection, worker } = req.body

    const today = new Date()
    const date = today.toISOString() // Generar fecha actual
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())

    // validar que todas los campos estan completados correctamente
    // vehicle
    if (!vehicle || typeof vehicle !== 'object') {
      console.log('Error: El campo "vehicle" es requerido y debe incluir: "id", "model" y "size".')
      return res.status(400).json({ message: 'El campo "vehicle" es requerido.' })
    }

    const { id, model, size } = vehicle

    if (!id || typeof id !== 'string') {
      console.log('Error: El campo "id" es requerido.')
      return res.status(400).json({ message: 'El campo "id" es requerido.' })
    }

    if (!model || typeof model !== 'string') {
      console.log('Error: El campo "model" es requerido.')
      return res.status(400).json({ message: 'El campo "model" es requerido.' })
    }

    if (!size || typeof size !== 'string') {
      console.log('Error: El campo "size" es requerido.')
      return res.status(400).json({ message: 'El campo "size" es requerido.' })
    }

    // inspection
    if (!inspection || typeof inspection !== 'object') {
      console.log('Error: El campo "inspection" es requerido y debe incluir: "itemFix" y "notes".')
      return res.status(400).json({ message: 'El campo "inspection" es requerido.' })
    }

    const { itemFix, notes } = inspection

    if (!Array.isArray(itemFix) || itemFix.length === 0) {
      console.log('Error: El campo "itemFix" es requerido y debe ser un array.')
      return res.status(400).json({ message: 'El campo "itemFix" es requerido y debe ser un array.' })
    }

    if (!notes || typeof notes !== 'string') {
      console.log('Error: El campo "notes" es requerido.')
      return res.status(400).json({ message: 'El campo "notes" es requerido.' })
    }

    // worker 
    if (!worker || typeof worker !== 'object') {
      console.log('Error: El campo "worker" es requerido y debe incluir: "workerName", "month", "year".')
      return res.status(400).json({ message: 'El campo "worker" es requerido.' })
    }

    const { workerName } = worker

    if (!workerName || typeof workerName !== 'string') {
      console.log('Error: El campo "workerName" es requerido.')
      return res.status(400).json({ message: 'El campo "workerName" es requerido.' })
    }

    // validar fecha
    if (!month || typeof month !== 'string' || !/^(0[1-9]|1[0-2])$/.test(month)) {
      console.log('Error: El campo "month" es requerido con un valor entre "01" y "12".')
      return res.status(400).json({ message: 'El campo "month" es requerido con un valor entre "01" y "12".' })
    }

    if (!year || typeof year !== 'string' || !/^\d{4}$/.test(year) || year < '2024' || year > '2099') {
      console.log('Error: El campo "year" es requerido: 4 dígitos (Ejemplo: "2024").')
      return res.status(400).json({ message: 'El campo "year" es requerido: 4 dígitos (Ejemplo: "2024").' })
    }

    // estructura de datos
    const newInspection = {
      vehicle: {
        id,
        model,
        size
      },
      inspection: {
        itemFix,
        notes
      },
      worker: {
        workerName,
        date,
        month,
        year
      }
    }

    // Agregar newInspection a la colección 'inspections'
    const InspectionRef = await db.collection('inspections').add(newInspection)

    console.log(`Inspección registrada: ${vehicle.model} - ${worker.workerName} - ${date}`)

    // Respuesta exitosa
    res.status(201).json({
      message: 'Nueva inspección registrada',
      Vehiculo: newInspection.vehicle.model,
      Matricula: newInspection.vehicle.id,
      Trabajador: newInspection.worker.workerName,
      Fecha: date
    })
  } catch (error) {
    console.error('Error al registrar inspección', error)
    res.status(500).json({ message: 'Error al registrar inspección' })
  }
}

export default createInspection
