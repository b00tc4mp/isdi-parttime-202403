import express, { json } from 'express'
import fs from 'fs'

const api = express()

api.get('/posts', (req, res) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        res.setHeader('Content-Type', 'application/json')
        res.send(json)
    })
})

api.listen(8080, () => console.log('api is up'))