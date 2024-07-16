import 'dotenv/config'
import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from './util/jsonwebtoken-promised.js'
import { ContentError, CredentialsError, DuplicityError, MatchError, NotFoundError, SystemError } from 'com/errors.js'

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

// Connect to MongoDB
mongoose.connect(MONGODB_URL)
    .then(() => {
        const { JsonWebTokenError, TokenExpiredError } = jwt

        const api = express()

        api.use(express.static('public'))
        api.use(cors())
        api.use(express.json())

        // Error handler
        function handleErrorResponse(error, res) {
            let status = 500

            if (error instanceof DuplicityError) status = 409
            else if (error instanceof ContentError) status = 400
            else if (error instanceof MatchError) status = 412
            else if (error instanceof CredentialsError) status = 401
            else if (error instanceof NotFoundError) status = 404

            res.status(status).json({ error: error.constructor.name, message: error.message })
        }

        // Middleware for token verification
        function verifyToken(req, res, next) {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                return res.status(401).json({ error: CredentialsError.name, message: 'No token provided' })
            }

            jwt.verify(token, JWT_SECRET)
                .then(payload => {
                    req.userId = payload.sub
                    next()
                })
                .catch(error => {
                    if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                        return res.status(401).json({ error: CredentialsError.name, message: error.message })
                    }
                    return res.status(500).json({ error: error.constructor.name, message: error.message })
                })
        }

        // Routes
        api.get('/', (req, res) => res.send('Hello, World!'))

        api.post('/users', (req, res) => {
            const { name, surname, email, username, password, passwordRepeat } = req.body
            logic.registerUser(name, surname, email, username, password, passwordRepeat)
                .then(() => res.status(201).send())
                .catch(error => handleErrorResponse(error, res))
        })

        api.post('/users/auth', (req, res) => {
            const { username, password } = req.body
            logic.authenticateUser(username, password)
                .then(userId => jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' }))
                .then(token => res.json(token))
                .catch(error => handleErrorResponse(error, res))
        })

        api.get('/users/:targetUserId', verifyToken, (req, res) => {
            const { targetUserId } = req.params
            logic.getUserName(req.userId, targetUserId)
                .then(name => res.json(name))
                .catch(error => handleErrorResponse(error, res))
        })

        api.get('/posts', verifyToken, (req, res) => {
            logic.getAllPosts(req.userId)
                .then(posts => res.json(posts))
                .catch(error => handleErrorResponse(error, res))
        })

        api.post('/posts', verifyToken, (req, res) => {
            const { title, image, description } = req.body
            logic.createPost(req.userId, title, image, description)
                .then(() => res.status(201).send())
                .catch(error => handleErrorResponse(error, res))
        })

        api.delete('/posts/:postId', verifyToken, (req, res) => {
            const { postId } = req.params
            logic.deletePost(req.userId, postId)
                .then(() => res.status(204).send())
                .catch(error => handleErrorResponse(error, res))
        })

        api.patch('/posts/:postId/likes', verifyToken, (req, res) => {
            const { postId } = req.params
            logic.toggleLikePost(req.userId, postId)
                .then(() => res.status(204).send())
                .catch(error => handleErrorResponse(error, res))
        })

        api.patch("/posts/:postId/comments", verifyToken, (req, res) => {
            const { postId } = req.params
            const { text } = req.body
            logic.createPostComment(req.userId, postId, text)
                .then(() => res.status(201).send())
                .catch(error => handleErrorResponse(error, res))
        })

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))

