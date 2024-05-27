const express = require('express')
const filesMiddleware = require('./filesMiddleware')

const server = express()

//server.use(express.static('public'))

server.get('/*', filesMiddleware)

server.listen(8080, () => console.log('server up'))