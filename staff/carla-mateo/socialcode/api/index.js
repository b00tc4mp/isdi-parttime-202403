import 'dotenv/config'
import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import { SystemError } from 'com/errors.js'
import mongoose from 'mongoose'

import jwt from './util/jsonwebtoken-promised.js'

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const { JsonWebTokenError, TokenExpiredError } = jwt

        const api = express()

        api.use(express.static('public'))

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, World!'))

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.post('/users', jsonBodyParser, (req, res) => {
            const { name, surname, email, username, password, passwordRepeat } = req.body

            try {
                logic.registerUser(name, surname, email, username, password, passwordRepeat)
                    .then(() => res.status(201).send())
                    .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            const { username, password } = req.body

            try {
                logic.authenticateUser(username, password)
                    .then(userId =>
                        jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '23h' })
                            .then(token => res.json(token))
                            .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
                    )
                    .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
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
                                .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
                        } catch (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        }
                    })
                    .catch(error => {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
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
                                .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
                        } catch (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        }
                    })
                    .catch(error => {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
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
                                .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
                        } catch (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        }
                    })
                    .catch(error => {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
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
                                .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
                        } catch (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        }
                    })
                    .catch(error => {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
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
                                .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
                        } catch (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        }
                    })
                    .catch(error => {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                    })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.patch('/posts/:postId/comments', jsonBodyParser, (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        const { sub: userId } = payload

                        const { postId } = req.params

                        const { comment } = body

                        try {
                            logic.createPostComment(userId, postId, comment)
                                .then(() => res.status(204).send())
                                .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
                        } catch (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        }
                    })
                    .catch(error => {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                    })

            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }


        })

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))

    })
    .catch(error => console.error(error))


