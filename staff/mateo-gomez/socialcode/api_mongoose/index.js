import 'dotenv/config'
import express from 'express'
//import fs from 'fs'
import logic from './logic/index.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { SystemError } from 'com/errors.js'
import mongoose from 'mongoose'


const { MONGODB_URL, PORT, JWT_SECRET } = process.env


mongoose.connect(MONGODB_URL)
    .then(() => {
        const { JsonWebTokenError, TokenExpiredError } = jwt

        const api = express()

        api.use(express.static('public'))

        api.use(cors())

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.get('/', (req, res) => res.send('Hello, World!'))

        api.post('/users', jsonBodyParser, (req, res) => {
            const { name, surname, email, username, password, passwordRepeat } = req.body

            try {
                logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
                    if (error) {
                        res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(201).send()
                })

            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }

        })

        api.options('users/auth', jsonBodyParser, (req, res) => {

            res.send()
        })


        api.post('/users/auth', jsonBodyParser, (req, res) => {
            const { username, password } = req.body

            try {
                logic.authenticateUser(username, password, (error, userId) => {
                    if (error) {
                        res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }
                        res.json(token)
                    })

                })

            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }

        })

        api.get('/users/:targetUserId', (req, res) => {


            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                            res.status(500).json({ error: SystemError.name, message: error.message })


                        } else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    const { sub: userId } = payload

                    const { targetUserId } = req.params


                    logic.getUserName(userId, targetUserId, (error, name) => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.json(name)

                    })
                })



            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })


            }
        })


        api.get('/posts', (req, res) => {
            try {

                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                            res.status(500).json({ error: SystemError.name, message: error.message })


                        } else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    const { sub: userId } = payload


                    logic.getAllPosts(userId, (error, posts) => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.json(posts)

                    })
                })
            } catch (error) {
                {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }

            }
        })


        api.post('/posts', jsonBodyParser, (req, res) => {

            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                            res.status(500).json({ error: SystemError.name, message: error.message })


                        } else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    const { sub: userId } = payload


                    const { title, image, description } = req.body


                    logic.createPost(userId, title, image, description, error => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }


                        res.status(201).send()
                    })
                })
            } catch (error) {
                {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }
            }

        })

        api.delete('/posts/:postId', (req, res) => {

            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                            res.status(500).json({ error: SystemError.name, message: error.message })


                        } else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    const { sub: userId } = payload
                    const { postId } = req.params

                    logic.deletePost(userId, postId, error => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }


                        res.status(204).send()
                    })
                })
            } catch (error) {
                {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }

            }
        })

        api.patch('/posts/:postId/likes', (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                            res.status(500).json({ error: SystemError.name, message: error.message })


                        } else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    const { sub: userId } = payload
                    const { postId } = req.params


                    logic.toggleLike(userId, postId, error => {
                        if (error) {
                            if (error) {
                                res.status(500).json({ error: error.constructor.name, message: error.message })


                                return
                            }
                        }


                        res.status(200).send()
                    })
                })
            } catch (error) {

                res.status(500).json({ error: error.constructor.name, message: error.message })


            }
        })

        /*function jsonBodyParser(req, res, next) {
            const contentType = req.headers['Content-Type']
         
            if (contentType.includes('application/json')) {
         
                let json = ''
         
                req.on('data', chunk => json += chunk.toString())
         
                req.on('end', () => {
                    const body = JSON.parse(json)
         
                    req.body = body
         
                    next()
                })
         
            } else next()
         
         
        }*/



        api.listen(PORT, () => console.log(`api is up on PORT ${PORT}`))
    })
    .catch(error => console.error(error))
