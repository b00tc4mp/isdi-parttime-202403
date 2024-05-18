const express = require('express') 
// const utils = require('./utils')

const server = express()

server.get('/*', (req, res) => {
    const path = req.params[0]
    res.send(path)
})

server.listen(8080, () => console.log('Server up'))
