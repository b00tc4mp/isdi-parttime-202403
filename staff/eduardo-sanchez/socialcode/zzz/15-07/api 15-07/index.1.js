import 'dotenv/config'
import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import { CredentialsError, SystemError } from 'com/errors.js'
import mongoose from 'mongoose'

import jwt from './util/jsonwebtoken-promised.js'

import errorHandler from './handlers/errorHandler.js'

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (_, res) => res.send('Hello, World!'))
        // api.get('/', (req, res) => res.send('Hello, World!'))

        api.get('/test', (_, __, next) => {
            next(new TypeError('hola type error'))
        }, (error, _, res, __) => {
            res.json(error)({ error: error.constructor.name })
        })

        /*
        api.get('/test', (req, res, next) => {
            next(new TypeError('hola type error'))
        })
        
        api.get('/test', (_, res, next) => next(new TypeError('hola type error')))

        api.get('/test', (_, res, next) => next(new TypeError('hola type error')), (error, _, res, next) => res.json(error)({ error: error.constructor.name }))

        api.get('/test', (_, __, next) => {
            next(new TypeError('hola type error'))
        }, (error, _, res, next) => {
            res.json(error)({ error: error.constructor.name })
        })
        
        */

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        // TODO api.post('/users', jsonBodyParser, registerUserHandler)
        api.post('/users', jsonBodyParser, (req, res, next) => {
            const { name, surname, email, username, password, passwordRepeat } = req.body

            try {
                logic.registerUser(name, surname, email, username, password, passwordRepeat)
                    .then(() => res.status(201).send())
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.post('/users/auth', jsonBodyParser, (req, res, next) => {
            const { username, password } = req.body

            try {
                logic.authenticateUser(username, password)
                    .then(userId =>
                        jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })
                            .then(token => res.json(token))
                            .catch(error => next(new SystemError(error.message)))
                    )
                    .catch(error => next(error))
            } catch (error) {
                next(error)
            }
        })

        api.get('/users/:targetUserId', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        const { sub: userId } = payload

                        const { targetUserId } = req.params

                        try {
                            logic.getUserName(userId, targetUserId)
                                .then(name => res.json(name))
                                .catch(error => next(error))
                        } catch (error) {
                            next(error)
                        }
                    })
                    .catch(error => next(new CredentialsError(error.message)))
            } catch (error) {
                next(error)
            }
        })

        api.get('/posts', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        const { sub: userId } = payload

                        try {
                            logic.getAllPosts(userId)
                                .then(posts => res.json(posts))
                                .catch(error => next(error))
                        } catch (error) {
                            next(error)
                        }
                    })
                    .catch(error => next(new CredentialsError(error.message)))
            } catch (error) {
                next(error)
            }
        })

        api.post('/posts', jsonBodyParser, (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        const { sub: userId } = payload

                        const { title, image, description } = req.body

                        try {
                            logic.createPost(userId, title, image, description)
                                .then(() => res.status(201).send())
                                .catch(error => next(error))
                        } catch (error) {
                            next(error)
                        }
                    })
                    .catch(error => next(new CredentialsError(error.message)))
            } catch (error) {
                next(error)
            }
        })

        api.delete('/posts/:postId', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        const { sub: userId } = payload

                        const { postId } = req.params

                        try {
                            logic.deletePost(userId, postId)
                                .then(() => res.status(204).send())
                                .catch(error => next(error))
                        } catch (error) {
                            next(error)
                        }
                    })
                    .catch(error => next(new CredentialsError(error.message)))
            } catch (error) {
                next(error)
            }
        })

        api.patch('/posts/:postId/likes', (req, res, next) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        const { sub: userId } = payload

                        const { postId } = req.params

                        try {
                            logic.toggleLikePost(userId, postId)
                                .then(() => res.status(204).send())
                                .catch(error => next(error))
                        } catch (error) {
                            next(error)
                        }
                    })
                    .catch(error => next(new CredentialsError(error.message)))
            } catch (error) {
                next(error)
            }
        })

        /*
        const errorHandler = (error, req, res, next) => {
            console.log(error)

            handleErrorResponse(error, res)
        }
        */

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))