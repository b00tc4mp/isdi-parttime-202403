import { Router } from 'express'
import getAllVehicles from '../handlers/vehiclesHandlers/getAllVehicles.js'
import createInspection from '../handlers/vehiclesHandlers/createInspection.js'
import getInspectionById from '../handlers/vehiclesHandlers/getInspectionById.js'
import deleteInspection from '../handlers/vehiclesHandlers/deleteInspection.js'

const vehiclesRoutes = Router()

// Ruta para obtener todos los vehiculos
vehiclesRoutes.get('/getAllVehicles', getAllVehicles)
// Ruta para obtener inspecciones por matricula
vehiclesRoutes.get('/getInspectionById/:id', getInspectionById)
// Ruta para crear una inspeccion
vehiclesRoutes.post('/createInspection', createInspection)
// Ruta para eliminar una inspeccion por ID de firebase
vehiclesRoutes.delete('/deleteInspection/:id', deleteInspection)

export default vehiclesRoutes