import express from 'express'
import fs from 'fs'
import logic from './logic/index.js'

import cors from 'cors'

const api = express()

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

api.get('/', (req, res) => res.send('Hello World!'))

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
    }
    catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})


api.post('/users/auth', jsonBodyParser, (req, res) => {
    const { name, surname, email, username, password, passwordRepeat } = req.body

    try {
        logic.authenticateUser(username, password, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(200).send()
        })
    }
    catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})


api.get('/posts', (req, res) => {
    fs.readFile('./data/posts.json', 'utf-8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        //res.setHeader('Content-Type', 'application/json')
        //res.send(json)

        const posts = JSON.parse(json)
        res.json(posts)
    })
})


api.get('/users', (req, res) => {
    fs.readFile('./data/users.json', 'utf-8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        //res.setHeader('Content-Type', 'application/json')
        //res.send(json)

        const users = JSON.parse(json)
        res.json(users)
    })
})


// function jsonBodyParser(req, res, next) {
//     const contentType = req.headers['content-type']

//     if (contentType.includes('application/json')) {
//         let json = ''

//         req.on('data', chunk => json += chunk.toString())

//         req.on('end', () => {
//             const body = JSON.parse(json)

//             req.body = body

//             next()
//         })
//     } else next()
// }


api.post('/posts', jsonBodyParser, (req, res) => {

    const post = req.body

    fs.readFile('./data/posts.json', 'utf-8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const posts = JSON.parse(json)

        post.id = `${Math.random().toString().slice(2)}-${Date.now()}`
        post.date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}h.`

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

api.listen(8080, () => console.log('api is up'))

