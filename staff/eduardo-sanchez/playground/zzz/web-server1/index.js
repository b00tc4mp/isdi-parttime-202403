
const express = require('express')

/*
const toRandomCase = require('./utils/toRandomCase')

const vowelsToNumbers = require('./utils/vowelsToNumbers')
*/

const utils = require('./utils')
// utils.toRandomCase(...)
// utils.vowelsToNumbers(...)


const server = express()

//http://localhost:8080/hello
server.get('/hello', (req, res) => {
    res.send(utils.toRandomCase('Hello, World!'))
    //res.status(201).send('Hello, World');

});

//http://localhost:8080/hello/pepito
server.get('/hello/:to', (req, res) => {
    //const to = req.params.to
    const { to } = req.params

    res.send(utils.vowelsToNumbers(`Hello, ${to}!`))
    //res.status(301).send(`Hello, ${to}!`);

});

const data = [
    { name: 'Peter Pan', age: 22 },
    { name: 'Wendy Dardoff', age: 30 },
    { name: 'Perico Palotes', age: 50 }
]

//http://localhost:8080/search?q=Peter
server.get('/search', (req, res) => {
    //const q = req.query.q
    const { q } = req.query

    const filtered = data.filter(person => person.name.includes(q))
    res.json(filtered)

})

server.listen(8080, () => console.log('server up'));