import { Router } from 'express'
import getAllVehicles from '../handlers/vehiclesHandlers/getAllVehicles.js'
import createInspection from '../handlers/vehiclesHandlers/createInspection.js'

const vehiclesRoutes = Router()

// Ruta para obtener todos los vehiculos
vehiclesRoutes.get('/getAllVehicles', getAllVehicles)
// Ruta para crear una inspeccion
vehiclesRoutes.post('/createInspection', createInspection)

export default vehiclesRoutes