const express = require('express')  // traer modulo {express}
const utils = require('./utils')  // al moverlos a otra carpeto no funcionara

const server = express() // creamos servidor

//http://localhost:8080/hello
server.get('/hello', (req, res) => {  // creamos ruta    //arrancar npm start ,apagar ctrl + C
    res.send(utils.toRandomCase('Hello, World!'))
})

//http://localhost:8080/hello/Adrian
server.get('/hello/:to', (req, res) => {
    // const to = req.params.to
    const { to } = req.params

    res.send(utils.vowelsToNumber(`Hello, ${to}!`))
})

const data = [                                // base de datos improvisada
    { name: 'Iñaki Barrera', age: 35 },
    { name: 'Jesus Bertolin', age: 27 },
    { name: 'Ismael Garrido', age: 29 }
]

//http://localhost:8080/search?q=Jesus      // buscamos en nuestra base de datos
server.get('/search', (req, res) => {
    // const q = req.query.q
    const { q } = req.query

    const filtered = data.filter(person => person.name.includes(q))

    res.json(filtered)
})

server.listen(8080, () => console.log('Server up'))  // puerto de arranque con chivato de arranque
