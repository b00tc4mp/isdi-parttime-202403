import { Router } from 'express'
import getAllWasteStored from '../handlers/storedHandlers/getAllWasteStored.js'
import deleteWaste from '../handlers/storedHandlers/deleteWaste.js'
import createWaste from '../handlers/storedHandlers/createWaste.js'

const storedRoutes = Router()

// Ruta para obtener todos los residuos
storedRoutes.get('/getAllWasteStored', getAllWasteStored)

// Ruta para crear un nuevo residuo
storedRoutes.post('/createWaste', createWaste)

// Ruta para eliminar un residuo por ID
storedRoutes.delete('/deleteWaste/:id', deleteWaste)

export default storedRoutes

