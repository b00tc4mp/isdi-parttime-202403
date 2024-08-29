const express = require('express')
const utils = require('./utils')


const server = express()

server.get('/hello', (req, res) => {
    res.send(utils.toRandomCase('Hello, World!'))
})

server.get('/hello/:to', (req, res) => {
    const { to } = req.params //const to = req.params.to

    res.send(utils.vowelsToNumbers(`Hello, ${to}!`))
})

const data = [
    { name: 'Peter Pan', age: 20 },
    { name: 'Lebron James', age: 39 },
    { name: 'Luka Doncic', age: 26 },
]

server.get('/search', (req, res) => {
    const { q } = req.query //const q = req.query.q

    const filtered = data.filter(person => person.name.includes(q))

    res.json(filtered)
})

server.listen(8080, () => console.log('server up'))