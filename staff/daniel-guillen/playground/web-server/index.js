const express = require('express')

const server = express()

server.get('/hello', (req, res) => {
    res.send('hello, world!')   

})
server.get('/hello/:to', (req, res) => {
    const { to } = req.params

    res.send(`hello, ${to}!`)  

})

const data = [
    { name: 'Peter Pan', age: 20 },
    { name: 'Wendy Darling', age: 21 },
    { name: 'Campanilla', age: 60 }
]

server.get('/search', (req, res) => {
    const { q } = req.query

    const filtered = data.filter(person => person.name.includes(q))

    res.json(filtered)
})

server.listen(8080, () => console.log('server up'))