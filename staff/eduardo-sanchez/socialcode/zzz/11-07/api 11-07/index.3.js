import 'dotenv/config'
import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import { CredentialsError, SystemError } from 'com/errors.js'
import mongoose from 'mongoose'

import jwt from './util/jsonwebtoken-promised.js'

import handleErrorResponse from './helper/handleErrorResponse.js'

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        // api.use(express.static('public')) // no hace falta xq no tenemos nada en la carpeta public (archivos estaticos). 
        // express.static actúa como un middleware en tu aplicación Express que intercepta las solicitudes HTTP para archivos estáticos y los sirve automáticamente

        api.use(cors())

        // api.use(express.json())
        // express.json() es un middleware incorporado en Express que analiza los cuerpos de las solicitudes entrantes que contienen datos en formato JSON. Este middleware convierte el cuerpo de la solicitud en un objeto JavaScript accesible a través de req.body, que luego puedes usar en tus rutas y controladores para manejar los datos de la solicitud.

        api.get('/', (req, res) => res.send('Hello, World!'))

        /*

        const errorHandler = (error, req, res, next) => {
            console.log(error)

            res.status(400).json({ error: error.constructor.name, message: error.message })
            res.send('end')
        }

        api.get('/test', (req, res, next) => {
            next(new TypeError('hola type error'))
        })
        
        api.use(errorHandler)
        */

        // llamariamos a esta ruta con: curl -v http://localhost:9010/test

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        // TODO api.post('/users', jsonBodyParser, registerUserHandler)
        api.post('/users', jsonBodyParser, (req, res) => {
            const { name, surname, email, username, password, passwordRepeat } = req.body

            try {
                logic.registerUser(name, surname, email, username, password, passwordRepeat)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        handleErrorResponse(error, res)
                    })
            } catch (error) {
                handleErrorResponse(error, res)
            }
        })

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            const { username, password } = req.body

            try {
                logic.authenticateUser(username, password)
                    .then(userId =>
                        jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })
                            .then(token => res.json(token))
                            .catch(error => handleErrorResponse(new SystemError(error.message), res))
                    )
                    .catch(error => handleErrorResponse(error, res))
            } catch (error) {
                handleErrorResponse(error, res)
            }
        })

        api.get('/users/:targetUserId', (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        const { sub: userId } = payload

                        const { targetUserId } = req.params

                        try {
                            logic.getUserName(userId, targetUserId)
                                .then(name => res.json(name))
                                .catch(error => handleErrorResponse(error, res))
                        } catch (error) {
                            handleErrorResponse(error, res)
                        }
                    })
                    .catch(error => handleErrorResponse(new CredentialsError(error.message), res))
            } catch (error) {
                handleErrorResponse(error, res)
            }
        })

        api.get('/posts', (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        const { sub: userId } = payload

                        try {
                            logic.getAllPosts(userId)
                                .then(posts => res.json(posts))
                                .catch(error => handleErrorResponse(error, res))
                        } catch (error) {
                            handleErrorResponse(error, res)
                        }
                    })
                    .catch(error => handleErrorResponse(new CredentialsError(error.message), res))
            } catch (error) {
                handleErrorResponse(error, res)
            }
        })

        api.post('/posts', jsonBodyParser, (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        const { sub: userId } = payload

                        const { title, image, description } = req.body

                        try {
                            logic.createPost(userId, title, image, description)
                                .then(() => res.status(201).send())
                                .catch(error => handleErrorResponse(error, res))
                        } catch (error) {
                            handleErrorResponse(error, res)
                        }
                    })
                    .catch(error => handleErrorResponse(new CredentialsError(error.message), res))
            } catch (error) {
                handleErrorResponse(error, res)
            }
        })

        api.delete('/posts/:postId', (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        const { sub: userId } = payload

                        const { postId } = req.params

                        try {
                            logic.deletePost(userId, postId)
                                .then(() => res.status(204).send())
                                .catch(error => handleErrorResponse(error, res))
                        } catch (error) {
                            handleErrorResponse(error, res)
                        }
                    })
                    .catch(error => handleErrorResponse(new CredentialsError(error.message), res))
            } catch (error) {
                handleErrorResponse(error, res)
            }
        })

        api.patch('/posts/:postId/likes', (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        const { sub: userId } = payload

                        const { postId } = req.params

                        try {
                            logic.toggleLikePost(userId, postId)
                                .then(() => res.status(204).send())
                                .catch(error => handleErrorResponse(error, res))
                        } catch (error) {
                            handleErrorResponse(error, res)
                        }
                    })
                    .catch(error => handleErrorResponse(new CredentialsError(error.message), res))
            } catch (error) {
                handleErrorResponse(error, res)
            }
        })
        // api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))