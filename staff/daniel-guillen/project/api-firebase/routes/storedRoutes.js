import { Router } from 'express'
import getAllWasteStored from '../handlers/storedHandlers/getAllWasteStored.js'
import getWasteStoredToday from '../handlers/storedHandlers/getWasteStoredToday.js'
import getWasteStored from '../handlers/storedHandlers/getWasteStored.js'
import getAllCodesStored from '../handlers/storedHandlers/getAllCodesStored.js'
import deleteWaste from '../handlers/storedHandlers/deleteWaste.js'
import createWaste from '../handlers/storedHandlers/createWaste.js'


const storedRoutes = Router()

// Ruta para obtener todos los residuos
storedRoutes.get('/getAllWasteStored', getAllWasteStored)

// Ruta para obtener todos los residuos del mes
storedRoutes.get('/getWasteStoredToday', getWasteStoredToday)

// Ruta para buscar residuo por codigo
storedRoutes.get('/getWasteStored/:month/:year/:code', getWasteStored)

// Ruta para buscar lista de codigos de residuos guardados
storedRoutes.get('/getAllCodesStored/', getAllCodesStored)

// Ruta para crear un nuevo residuo
storedRoutes.post('/createWaste', createWaste)

// Ruta para eliminar un residuo por ID
storedRoutes.delete('/deleteWaste/:id', deleteWaste)

export default storedRoutes

