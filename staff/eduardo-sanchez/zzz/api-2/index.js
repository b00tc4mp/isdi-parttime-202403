import express from 'express'
import fs from 'fs'

const api = express()

api.get('/posts', (req, res) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
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
    fs.readFile('./data/users.json', 'utf8', (error, json) => {
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

api.post('/users', (req, res) => {
    let json = ''

    //req.on('data', chunk => console.log(chunk))
    //req.on('data', chunk => console.log(chunk.toString()))

    req.on('data', chunk => json += chunk.toString())

    // req.on('end', () => console.log(json))

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
            //const newJson = JSON.stringify(users, null, 4)

            fs.writeFile('./data/users.json', newJson, error => {
                if (error) {
                    res.status(500).json({ error: error.constructor.name, message: error.message })

                    return
                }

                res.status(201).send()
            })
        })
    })
})

api.post('/posts', (req, res) => {
    let json = ''

    req.on('data', chunk => json += chunk.toString())

    req.on('end', () => {
        const post = JSON.parse(json)

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
})


api.listen(8080, () => console.log('api is up'))