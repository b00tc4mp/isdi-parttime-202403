import { Router } from 'express'
import getAllLoads from '../handlers/departuresHandlers/getAllLoads.js'
import getAllReferenceLoads from '../handlers/departuresHandlers/getAllReferenceLoads.js'
import deleteLoad from '../handlers/departuresHandlers/deleteLoad.js'
import createLoad from '../handlers/departuresHandlers/createLoad.js'
import getLoadByReference from '../handlers/departuresHandlers/getLoadsByReference.js'
import getLoadByWeekYear from '../handlers/departuresHandlers/getLoadsByWeekYear.js'
import getLoadsByWeekYearReference from '../handlers/departuresHandlers/getLoadsByWeekYearReference.js'

const departuresRoutes = Router()

// Ruta para obtener todos los residuos cargados
departuresRoutes.get('/getAllLoads', getAllLoads)

// Ruta para obtener todas referencias almacenadas
departuresRoutes.get('/getAllReference', getAllReferenceLoads)

// Ruta para obtener documentos con una referencia específica
departuresRoutes.get('/getAllLoads/:reference', getLoadByReference)

// Ruta para obtener documentos por semana y año actual
departuresRoutes.get('/getAllLoads/:week/:year', getLoadByWeekYear)

// Ruta para obtener documentos por semana, año actual y referencia
departuresRoutes.get('/getAllLoads/:week/:year/:reference', getLoadsByWeekYearReference)

// Ruta para crear un nuevo residuo
departuresRoutes.post('/createLoad', createLoad)

// Ruta para eliminar un residuo por ID
departuresRoutes.delete('/deleteLoad/:id', deleteLoad)

export default departuresRoutes