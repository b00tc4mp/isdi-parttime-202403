const express = require('express')
const utils = require('./utils')

const server = express()

// http://localhost:8080/hello
server.get('/hello', (req, res) => {
    res.send(utils.toRandomCase('Hello, World!'))
})

// http://localhost:8080/hello/Pepito
server.get('/hello/:to', (req, res) => {
    //const to = req.params.to
    const { to } = req.params

    res.send(utils.vowelsToNumbers(`Hello, ${to}!`))
})

const data = [
    { name: 'Peter Pan', age: 20 },
    { name: 'Wendy Darling', age: 21 },
    { name: 'Campanilla', age: 60 }
]

// http://localhost:8080/search?q=Peter
server.get('/search', (req, res) => {
    //const q = req.query.q
    const { q } = req.query

    const filtered = data.filter(person => person.name.includes(q))

    res.json(filtered)
})

server.listen(8080, () => console.log('server up'))