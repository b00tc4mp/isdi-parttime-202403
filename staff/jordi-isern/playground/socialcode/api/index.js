import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { SystemError } from './error.js'

const api = express()

api.use(express.static('public'))

api.use(cors())

api.get('/', (req, res) => res.send('Hello, World!'))

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

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

            const token = jwt.sign({sub: username}, 'voy a ir al granada fest', {expiresIn:'1h'})

            res.json(token)
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/users/:targetUsername', (req, res) => {


    try {
        const token = req.headers.authorization.slice(7)

        const {sub: username} = jwt.verify(token,'voy a ir al granada sound' )

        const { targetUsername } = req.params
        
        logic.getUserName(username, targetUsername, (error, name) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(name)
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts', (req, res) => {
    try {
        logic.getAllPosts((error, posts) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(posts)
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/posts', jsonBodyParser, (req, res) => {
   

    try {

        const token = req.headers.authorization.slice(7)
        
        const {sub: username} = jwt.verify(token,'voy a ir al granada sound' )

        const { title, image, description } = req.body
        logic.createPost(username, title, image, description, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        if(error instanceof JsonWebTokenError){
            res.status(500).json({error : SystemError.name, message: error.message})
        }
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.delete('/posts/:postId', (req, res) => {
   
    try {
        const token = req.headers.authorization.slice(7)

        const {sub:username} = jwt.verify(token, 'voy a ir  al granda sound')

        const { postId } = req.params
    
        logic.deletePost(username, postId, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(204).send()
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.listen(8080, () => console.log('api is up'))