const express = require('express')
const fs = require("fs")

const filesMiddleware = require("./filesMiddleware")

const utils = require('./utils')

const server = express()

// server.use(express.static('public'))

// http://localhost:8080/hello
server.get("/hello", (req, res) => {

  res.status(200).send(utils.toRandomCase("Hello World!"))
})


// http://localhost:8080/hello/pepito (nombre de la persona que quieras)
server.get("/hello/:to", (req, res) => {

  //const to = req.params.to

  const { to } = req.params

  res.status(201).send(utils.vowelsToNumbers(`Hello ${to}!`))

})

const data = [
  { name: "Peter Pan", age: 20 },
  { name: "Wendy Darling", age: 30 },
  { name: "Jack", age: 30 }

]


// http://localhost:8080/search?q=Peter
server.get("/search", (req, res) => {
  //const q = req.query.q

  const { q } = req.query

  const filtered = data.filter(user => user.name.includes(q))

  res.json(filtered) // res.send(filtered)
})


//? ----------------------------------------------------------------------


server.get("/*", filesMiddleware)



server.listen(8081, () => console.log("server running on port 8080  http://localhost:8081"))