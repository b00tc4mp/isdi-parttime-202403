import express from 'express'
import fs from 'fs'

const api = express()

api.get('/posts', (req, res) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

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
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        // res.setHeader('Content-Type', 'application/json')
        // res.send(json)

        const posts = JSON.parse(json)

        res.json(posts)
    })

})

api.post('/users', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk.toString())

    req.on('end', () => {
        const user = JSON.parse(json)

        fs.readFile('./data/users.json', 'utf8', (error, json) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            const users = JSON.parse(json)
            users.push(user)

            const newJson = JSON.stringify(users)

            fs.writeFile('./data/user.json', newJson, error => {
                if (error) {
                    res.status(500).json({ error: error.constructor.name, message: error.message })

                    return
                }

                res.status(201).send()
            })

        })
    })
})

api.listen(8080, () => console.log('api is up'))
