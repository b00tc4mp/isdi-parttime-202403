import "dotenv/config"
import express from "express"
import logic from "./logic/index.js"
import cors from "cors"
import jwt from "jsonwebtoken"
import { SystemError } from 'com/errors.js'
import mongoose from "mongoose"

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        const { JsonWebTokenError, TokenEpiredError } = jwt

        const api = express()

        api.use(express.static("public"))

        api.use(cors())

        const jsonBodyParser = express.json({ strict: true, type: "application/json" })


        //comprobamos que la api funciona
        api.get("/", (req, res) => res.send("Hello world"))

        //creamos nuevo usuario

        api.post("/users", jsonBodyParser, (req, res) => {
            //ahora ya hay separacion de responsabilidades con lo que no usamos data en este archivo
            const { email, username, password, passwordRepeat } = req.body

            try {
                logic.registerUser(email, username, password, passwordRepeat, error => {
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

        //autentificacion de usuario
        api.post("/users/auth", jsonBodyParser, (req, res) => {
            //ahora ya hay separacion de responsabilidades con lo que no usamos data en este archivo

            const { username, password } = req.body

            try {//hacemos que devuelva userId
                logic.authenticateUser(username, password, (error, userId) => {
                    if (error) {
                        res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }
                    // SYNCROconst token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: '1h' })
                    // ASYNCRO 
                    jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7d' }, (error, token) => {
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

        api.get("/users/:targetUserId", (req, res) => {
            try {
                const token = req.headers.authorization.slice(7) //a partir del caracter 6 de la cabecera

                //validamos el token
                // si todo va bien el verify devuelve un json convertido a un objeto (payload), que
                // desestructuramos el objeto y usamos el valor de interes (el sub del token) y lo metemos en la variable username
                // SYNCR const { sub: username } = jwt.verify(token, JWT_SECRET)
                // ASYNCR 
                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenEpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }
                    const { sub: userId } = payload

                    const { targetUserId } = req.params

                    logic.getUsername(userId, targetUserId, (error, username) => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.json(username)
                    })
                })

            } catch (error) {
                //convertimos el verify en asincrono
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get("/posts", (req, res) => {
            try {
                //añadimos que pida username para poder accedir a los posts
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenEpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }
                    const { sub: userId } = payload

                    logic.getPosts(userId, (error, posts) => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }
                        res.json(posts) //automaticamente enviara estado 200
                    })
                })

            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        // creamos nuevo post
        api.post("/posts", jsonBodyParser, (req, res) => {
            try {

                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenEpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else

                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }
                    const { sub: userId } = payload

                    const { title, image, description } = req.body

                    logic.createPost(userId, title, image, description, (error) => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }
                        res.status(201).send() //automaticamente enviara estado 200
                    })
                })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        // eliminamos un post
        api.delete("/posts/:postId", (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenEpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
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
                        res.status(204).send() //cuando no hay nada que responder, todo Ok pero no hay contenido de respuesta
                    })
                })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })
        // LIKES
        api.patch("/posts/:postId/likes", (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenEpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }
                    const { sub: userId } = payload

                    const { postId } = req.params

                    logic.toggleLikePost(userId, postId, error => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }
                        res.status(200).send() //cuando no hay nada que responder, todo Ok pero no hay contenido de respuesta
                    })
                })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))

    })
    .catch(error => console.error(error))
