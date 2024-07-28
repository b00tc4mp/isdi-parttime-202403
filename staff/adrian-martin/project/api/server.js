import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import logic from './logic/index.js'
import errorHandler from './handlers/errorHandler.js'

const { PORT, MONGODB_URL } = process.env

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()
        api.use(cors())

        api.get('/', (_, res) => {
            res.send('hello world')
        })

        api.post('/users', jsonBodyParser, (req, res, next) => {
            try {
                const { name, username, email, password } = req.body

                logic.registerUser(name, username, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`Tamo laiiiffff on http://localhost:${PORT}`))
    })
    .catch(error => console.error(error))