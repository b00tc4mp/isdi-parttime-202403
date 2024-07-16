import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'

import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    getAllPostsHandler,
    createPostHandler,
    deletePostHandler,
    toggleLikePostHandler,
    errorHandler,
} from './handlers/index.js'

import createPostHandler from './handlers/createPostHandler.js'

const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        // const { JsonWebTokenError, TokenExpiredError } = jwt

        const api = express()

        api.use(cors())

        api.get('/', (_, res) => res.send('Hello, World!'))

        api.get('/test', (_, res, next) => next(new TypeError('hello type')))

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId', getUserNameHandler)

        api.get('/posts', getAllPostsHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.delete('/posts/:postId', deletePostHandler)

        api.patch('/posts/:postId/likes', toggleLikePostHandler)

        api.use(errorHandler)

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
