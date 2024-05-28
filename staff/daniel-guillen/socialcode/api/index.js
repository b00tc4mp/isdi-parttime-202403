import express from 'express'
import fs from 'fs'
import logic from './logic/index.js'

const api = express()

api.use(express.static('public'))

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

            res.status(200).send()
        })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts', (req, res) => {
    // TODO use logic here

    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const posts = JSON.parse(json)
        res.json(posts)
    })
})

api.post('/posts', jsonBodyParser, (req, res) => {
    const post = req.body

    // TODO use logic here

    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const posts = JSON.parse(json)

        post.id = `${Math.random().toString().slice(2)}-${Date.now()}`
        post.date = new Date().toISOString()

        posts.push(post)

        const newJson = JSON.stringify(posts)

        fs.writeFile('./data/posts.json', newJson, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })
    })
})

api.listen(8080, () => console.log('api is up!'))