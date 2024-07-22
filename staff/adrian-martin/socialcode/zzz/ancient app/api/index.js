import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'

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
    const {username, password} = req.body

    try {
        logic.authenticateUser(username, password, error => {
            if (error) {
                res.status(500).json({error: error.constructor.name, message: error.message})
    
                return
            }
            console.log(`User ${username} authenticated`)
            res.send()
        })
    } catch (error) {
        res.status(500).json({error: error.constructor.name, message: error.message})
    } 
})

api.get('/users/:targetUsername', (req, res) => {
    const username = req.headers.authorization.slice(6)

    const { targetUsername } = req.params

    try {
        logic.getUserName(username, targetUsername, (error, name) => {
            if(error){
                res.status(500).json({error: error.constructor.name, message: error.message})

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
            if(error){
                res.status(500).json({error: error.constructor.name, message: error.message})

                return
            }
            res.json(posts)
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})


api.post('/posts', jsonBodyParser, (req, res) => {
    const username = req.headers.authorization.slice(6)

    const { title, image, description  } = req.body
    

    try {
        logic.createPost(username, title, image, description, error => {
            if (error) {
                res.status(500).json({error: error.constructor.name, message: error.message})
    
                return
            }
    
            res.status(201).send()
        })
    } catch (error) {
        console.error(error)
    }
})


api.delete('/posts/:postId', (req, res) => {
    const username = req.headers.authorization.slice(6)

    const { postId } = req.params
    

    try {
        logic.deletePost(username, postId, error => {
            if (error) {
                res.status(500).json({error: error.constructor.name, message: error.message})
    
                return
            }
    
            res.status(204).send()
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.listen(8080, () => console.log('api is up'))

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
