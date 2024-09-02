import express from 'express'
import 'dotenv/config'
import { PORT } from './config.js'
import routes from './routes/index.js'

const api = express()
// Middleware parse JSON
api.use(express.json({ strict: true, type: 'application/json' }))

// traemos todas las rutas
api.use('/', routes)



api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
