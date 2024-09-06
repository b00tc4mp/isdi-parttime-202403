import express from 'express'
import 'dotenv/config'
import { PORT } from './config.js'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import storedRoutes from './routes/storedRoutes.js'
import departuresRoutes from './routes/departuresRoutes.js'

const api = express()
// Middleware parse JSON
api.use(express.json({ strict: true, type: 'application/json' }))

api.use(cors())

// traemos todas las rutas
api.use('/users/', userRoutes)
api.use('/stored/', storedRoutes)
api.use('/departures/', departuresRoutes)

api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
