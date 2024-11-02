import express from 'express'
import 'dotenv/config'
import { PORT } from './config.js'
import cors from 'cors'
import errorHandler from './handlers/errorHandler.js'
import userRoutes from './routes/userRoutes.js'
import storedRoutes from './routes/storedRoutes.js'
import departuresRoutes from './routes/departuresRoutes.js'
import vehiclesRoutes from './routes/vehiclesRoutes.js'

const api = express()
// Middleware parse JSON
api.use(express.json({ strict: true, type: 'application/json' }))

api.use(cors())

api.use(errorHandler)

// traemos todas las rutas
api.use('/users/', userRoutes)
api.use('/stored/', storedRoutes)
api.use('/departures/', departuresRoutes)
api.use('/vehicles/', vehiclesRoutes)

api.listen(PORT, () => console.log(`Cowabunga! PORT ${PORT}`))
