import { Router } from 'express'
import getAllVehicles from '../handlers/vehiclesHandlers/getAllVehicles.js'

const vehiclesRoutes = Router()

// Ruta para obtener todos los vehiculos
vehiclesRoutes.get('/getAllVehicles', getAllVehicles)

export default vehiclesRoutes