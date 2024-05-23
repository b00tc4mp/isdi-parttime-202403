import express from 'express'
import fs from 'fs'

const api = express()

api.get('/posts', (req, res) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({error: error.constructor.name, message: error.message})

            return
        }

        // res.setHeader('Content-Type', 'application/json')
        // res.send(json)

        const posts = JSON.parse(json)
        res.json(posts)
    })
})

api.get('/users', (req, res) => {
    fs.readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({error: error.constructor.name, message: error.message})

            return
        }

        // res.setHeader('Content-Type', 'application/json')
        // res.send(json)

        const users = JSON.parse(json)
        res.json(users)
    })
})

api.listen(8080, () => console.log('api is up'))