import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import jwt from './utils/jsonwebtoken-promised.js'
import error, { SystemError } from 'com/error.js'
import 'dotenv/config'
import mongoose from 'mongoose'

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
                    .then(userId => {
                        return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })
                            .then(token => {
                                console.log(`User ${username} authenticated`)

                                res.json(token)
                            })
                            .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
                    })
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

                        return
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

                        return
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

                        return
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

                        return
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

                        return
                    })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))



//?--------------------------------------- jsonBodyParser manually

// const jsonBodyParser = express.json({strict: true, type: 'application/json'})

// function jsonBodyParser(req, res, next) {
//     const contentType = req.headers['Content-Type']

//     if (contentType.includes('application/json')) {

//         let json = ''

//         req.on('data', chunk => json += chunk.toString())

//         req.on('end', () => {
//             const body = JSON.parse(json)

//             req.body = body

//             next()
//         })
//     }else next()
// }


// CORS

// api.use('/users/auth', (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500') //http://127.0.0.1:5500/
//     res.setHeader('Access-Control-Allow-Methods', '*')
//     res.setHeader('Access-Control-Allow-Headers', '*')

//     next()
// })
