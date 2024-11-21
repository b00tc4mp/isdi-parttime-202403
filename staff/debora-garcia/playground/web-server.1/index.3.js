const express = require("express")

//importamos la funcion de otro fichero
const toRandomCase = require("./toRandomCase")
const vowelsToNumbers = require("./utils/vowelsToNumbers")
const server = express()

server.get("/hello", (req, res) => {
    //res.send("hello world")
    //con 201 envias estado satisfactorio
    res.status(201).send(toRandomCase("Hello, world"))

})

// creamos una ruta con parametros, que reciba un nombre y lo devuelva
// request es lo que me envia el cliente/nevegador
server.get("/hello/:to", (req, res) => {
    //params es un lugar donde express pone los parametros donde tu puedes enviar en una ruta
    //const to = req.params.to

    const { to } = req.params
    res.send(vowelsToNumbers(`Hello, ${to}`))
})

const data = [
    { name: "Peter Pan", age: 20 },
    { name: "Wendy Darling", age: 21 },
    { name: "Ada Love", age: 30 },
]

//devuelve el objeto que cumple con dicha condicion, en este caso nombre que contenga X letra
server.get("/search", (req, res) => {
    //queri tiene la funcion de recibir parametros de busqueda
    //const q = req.query.q

    const { q } = req.query

    const filtered = data.filter(person > person.name.includes(q))
    //cuando el servidor responda devolvera un json
    res.json(filtered)
})


server.listen(8080, () => console.log("server up"))