const express = require('express')
const filesMiddleware = require('./filesMiddleware')

const server = express()

server.get('/*', filesMiddleware)

server.listen(8080, () => console.log('server up'))
