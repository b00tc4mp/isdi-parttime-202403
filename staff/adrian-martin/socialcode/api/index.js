import express from 'express'
import fs from 'fs'

const api = express()

const jsonBodyParser = express.json({strict: true, type: 'application/json'})

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

// $ curl -X POST http://localhost:8080/posts -d '{"author":"adrianGon","title":"Smily","image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB0_ijMX_4xf0rGse2D334wtm-LcqQ_lrsFQ&s","description":"se felis"}' -v
api.post('/posts', jsonBodyParser, (req, res) => {
    const post = req.body

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

api.get('/users', (req, res) => {
    fs.readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const users = JSON.parse(json)
        res.json(users)
    })
})

// $ curl -X POST http://localhost:8080/users -d '{"name":"Ismael","surname":"Garrido","email":"ismael@garrido.com","username":"marver","password":"123123123"}' -v
api.post('/users', jsonBodyParser, (req, res) => {
    const user = req.body

    // fs.readFile('./data/users.json', 'utf8', (error, json) => {
    //     if (error) {
    //         res.status(500).json({ error: error.constructor.name, message: error.message })

    //         return
    //     }

    //     const users = JSON.parse(json)
    //     users.push(user)

    //     const newJson = JSON.stringify(users)

    //     fs.writeFile('./data/users.json', newJson, error => {
    //         if (error) {
    //             res.status(500).json({ error: error.constructor.name, message: error.message })

    //             return
    //         }

    //         res.status(201).send()
    //     })
    // })

    const {name, surname, email, username, password, passwordRepeat} = user

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
    
                return
            }
        })
    } catch (error) {
        res.status(201).send()
    }
})

api.listen(8080, () => console.log('api is up'))