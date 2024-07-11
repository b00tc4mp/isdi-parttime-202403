import 'dotenv/config'
import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import mongoose from 'mongoose'

import jwt from './util/jsonwebtoken-promised.js'
import { DuplicityError, SystemError, ContentError, CredentialsError, NotFoundError, MatchError } from 'com/errors.js'

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        const { JsonWebTokenError, TokenExpiredError } = jwt

        const api = express()

        api.use(express.static('public'))

        api.use(cors())

        api.use(express.json())

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.get('/', (req, res) => res.send('Hello, World!'))

        function handleErrorResponse(error, res) {
            let status = 500

            if (error instanceof DuplicityError)
                status = 409
            else if (error instanceof ContentError)
                status = 400
            else if (error instanceof MatchError)
                status = 412
            else if (error instanceof CredentialsError)
                status = 401
            else if (error instanceof NotFoundError)
                status = 404

            res.status(status).json({ error: error.constructor.name, message: error.message })
        }

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
                    .then(userId => {
                        jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })
                            .then(token => res.json(token))
                            .catch(error => {
                                handleErrorResponse(new SystemError(error.message), res)
                            })
                    })
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
                    .catch(error => {
                        handleErrorResponse(new CredentialsError(error.message), res)
                    })
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
                                .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
                        } catch (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        }
                    })
                    .catch(error => {
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
                    .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
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
                    .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
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
                    .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.patch("/posts/:postId/comments", jsonBodyParser, (req, res) => {

            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        // if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {

                        //     res.status(500).json({ error: SystemError.name, message: error.message })
                        // } else {

                        res.status(500).json({ error: error.constructor.name, message: error.message })
                        // }
                        return
                    }

                    const { sub: userId } = payload

                    const { postId } = req.params

                    const { textComment } = req.body

                    logic.createComment(userId, textComment, postId, (error) => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                            return
                        }
                        res.status(201).send()
                    })
                })

            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })
        api.listen(PORT, () => console.log(`API is running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))
