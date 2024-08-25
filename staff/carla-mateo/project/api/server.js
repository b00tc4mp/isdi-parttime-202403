import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import errorHandler from './handlers/errorHandler.js'
import router from './handlers.js'

const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, World!'))

        api.use('/', router)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on PORT http://localhost:${PORT}`))

    })
    .catch(error => console.error(error))
