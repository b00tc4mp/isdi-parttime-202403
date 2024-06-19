import errors from '../app/src/errors.js'

import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { SystemError } from './errors.js'

const { JsonWebTokenError, TokenExpiredError } = jwt

const api = express()

api.use(express.static('public'))

api.use(cors())

api.use(express.json())

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

api.post('/users/auth', jsonBodyParser, (req, res) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            const token = jwt.sign({ sub: username }, 'hola', { expiresIn: '1h' })

            res.json(token)
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/users/:targetUsername', (req, res) => {
    const token = req.headers.authorization.slice(7)

    const { sub: username } = jwt.verify(token, 'hola')

    const { targetUsername } = req.params

    try {
        logic.getUserName(username, targetUsername, (error, name) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(name)
        })
    } catch (error) {
        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
            res.status(500).json({ error: SystemError.name, message: error.message })
        else
            res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts', (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)

        const { sub: username } = jwt.verify(token, 'hola')

        logic.getAllPosts(username, (error, posts) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(posts)
        })
    } catch (error) {
        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
            res.status(500).json({ error: SystemError.name, message: error.message })
        else
            res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/posts', jsonBodyParser, (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)

        const { sub: username } = jwt.verify(token, 'hola')

        const { title, image, description } = req.body

        logic.createPost(username, title, image, description, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
            res.status(500).json({ error: SystemError.name, message: error.message })
        else
            res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.delete('/posts/:postId', (req, res) => {
    const token = req.headers.authorization.slice(7)

    const { sub: username } = jwt.verify(token, 'hola')

    const { postId } = req.params

    try {
        logic.deletePost(username, postId, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(204).send()
        })
    } catch (error) {
        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
            res.status(500).json({ error: SystemError.name, message: error.message })
        else
            res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.listen(8080, () => console.log('api is up'))